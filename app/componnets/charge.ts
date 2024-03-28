import {
  Connection,
  Keypair,
  PublicKey,
  Transaction,
  TransactionInstruction,
  clusterApiUrl,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
export const Charge = () => {
  const connection = new Connection("http://localhost:8899", "confirmed");
  // 新建一个账号(我本地的)
  const account = "BUwYuS6p6368KS39wJX1uG5Eh2BzzTA2m68gHhUihxQz";
  // 发送10个sol空投到该账号
  const lamports = 10 * 1000000000;
  connection.requestAirdrop(new PublicKey(account), lamports).then((res) => {
    console.log(res);
    console.log("空投完成, 准备测试合约");
    // 发送合约请求
    // 目标账号：2f2vBERFcPd3geN159TAvRdDYvvzy9Kvs5Ju5HWtMgGq(也是我本地的)
    // solana_memo_program.json
    const instruction = new TransactionInstruction({
      keys: [],
      programId: new PublicKey("D8Cnv1UcThay2WijWP4SQ8G683UuVsKPaZEU7TNVKW1j"),
      data: Buffer.from("Biteying"),
    });
    console.log(`账号:${new PublicKey(account).toBase58()}`);
    sendAndConfirmTransaction(
      connection,
      new Transaction().add(instruction),
      [Keypair.generate()],
      {
        skipPreflight: true,
        commitment: "singleGossip",
      }
    ).then((res) => {
      console.log(res);
      console.log("合约请求发送成功");
    });
  });
};
