import { Metadata } from "next";
import React from "react";
import styles from "./auth.module.css";
import AuthButton from "./authButton";

export const metadata: Metadata = {
  title: "Authenticate",
  description: "Authenticate to Access Uchiha Digital Resources",
};

const Auth = () => {
  return (
    <div className={styles.body}>
      <h3 className={styles.title}>Welcome to Uchiha Digital</h3>
      <p className={styles.description}>Please authenticate to continue.</p>
      <AuthButton />
    </div>
  );
};

export default Auth;
