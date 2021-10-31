import React, { useEffect, useState } from "react";
import eth from "../eth.png";
import dapp from "../dapp.png";
import dai from "../dai.png";
import { YourWallet } from "./yourWallet";
import { TokenFarmContract } from "./tokenFarmContract";
import { useEthers } from "@usedapp/core";
import { constants } from "ethers";
import { Snackbar, Typography, makeStyles } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import networkMapping from "../chain-info/deployments/map.json";
import brownieConfig from "../brownie-config.json";
import helperConfig from "../helper-config.json";

export type Token = {
  image: string;
  address: string;
  name: string;
};

const useStyles = makeStyles((theme) => ({
  title: {
    color: theme.palette.common.white,
    textAlign: "center",
    padding: theme.spacing(4),
  },
}));

export const Main = () => {
  const classes = useStyles();

  const { chainId, error } = useEthers();
  const networkName = chainId ? helperConfig[chainId] : "dev";
  const dappTokenAddress = chainId
    ? networkMapping[String(chainId)]["DappToken"][0]
    : constants.AddressZero;
  const wethTokenAddress = chainId
    ? brownieConfig["networks"][networkName]["weth_token"]
    : constants.AddressZero;
  const fauTokenAddress = chainId
    ? brownieConfig["networks"][networkName]["fau_token"]
    : constants.AddressZero;

  const supportedTokens: Array<Token> = [
    {
      image: dapp,
      address: dappTokenAddress,
      name: "DAPP",
    },
    {
      image: eth,
      address: wethTokenAddress,
      name: "WETH",
    },
    {
      image: dai,
      address: fauTokenAddress,
      name: "DAI",
    },
  ];

  const [showNetworkError, setShowNetworkError] = useState(false);

  const handleCloseNetworkError = (
    event: React.SyntheticEvent | React.MouseEvent,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    showNetworkError && setShowNetworkError(false);
  };

  /**
   * useEthers will return a populated 'error' field when something has gone wrong.
   * We can inspect the name of this error and conditionally show a notification
   * that the user is connected to the wrong network.
   */
  useEffect(() => {
    if (error && error.name === "UnsupportedChainIdError") {
      !showNetworkError && setShowNetworkError(true);
    } else {
      showNetworkError && setShowNetworkError(false);
    }
  }, [error, showNetworkError]);

  return (
    <>
      <Typography
        variant="h2"
        component="h1"
        classes={{
          root: classes.title,
        }}
      >
        Dapp Token Farm
      </Typography>
      <YourWallet supportedTokens={supportedTokens} />
      <TokenFarmContract supportedTokens={supportedTokens} />
      <Snackbar
        open={showNetworkError}
        autoHideDuration={5000}
        onClose={handleCloseNetworkError}
      >
        <Alert onClose={handleCloseNetworkError} severity="warning">
          You gotta connect to the Kovan or Rinkeby network!
        </Alert>
      </Snackbar>
    </>
  );
};
