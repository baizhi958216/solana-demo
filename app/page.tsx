"use client";
import {
  Connection,
  clusterApiUrl,
  Keypair,
  LAMPORTS_PER_SOL,
  Transaction,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
import {
  createMint,
  getOrCreateAssociatedTokenAccount,
  mintTo,
  createTransferInstruction,
} from "@solana/spl-token";
import { useEffect } from "react";
export default function Home() {
  useEffect(() => {
    const controller = new AbortController();
    const pay = async () => {
      const connection = new Connection("http://localhost:8899", "confirmed");
      const fromWallet = Keypair.generate();
      const fromAirdropSignature = await connection.requestAirdrop(
        fromWallet.publicKey,
        LAMPORTS_PER_SOL
      );
      // Wait for airdrop confirmation
      await connection.confirmTransaction(fromAirdropSignature);
      const toWallet = Keypair.generate();
      const mint = await createMint(
        connection,
        fromWallet,
        fromWallet.publicKey,
        null,
        9
      );
      const fromTokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        fromWallet,
        mint,
        fromWallet.publicKey
      );

      const toTokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        fromWallet,
        mint,
        toWallet.publicKey
      );
      // Minting 1 new token to the "fromTokenAccount" account we just returned/created
      await mintTo(
        connection,
        fromWallet,
        mint,
        fromTokenAccount.address,
        fromWallet.publicKey,
        1000000000, // it's 1 token, but in lamports
        []
      );
      // Add token transfer instructions to transaction
      const transaction = new Transaction().add(
        createTransferInstruction(
          fromTokenAccount.address,
          toTokenAccount.address,
          fromWallet.publicKey,
          1
        )
      );

      // Sign transaction, broadcast, and confirm
      await sendAndConfirmTransaction(connection, transaction, [fromWallet]);
    };
    pay();

    return () => {
      controller.abort();
    };
  }, []);
  return <div>Get</div>;
}
