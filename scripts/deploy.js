async function main(){
    
  // аргументы для конструктора контракта
  const name = "MSHPToken";
  const symbol = "MSHP";
  const decimals = 3;
  
  // операции над токенами
  // на аккаунт user1 минтится totalValue MSHP-копеек
  // аккаунт user1 переводит аккаунту user2 transferValue MSHP-копеек
  const totalValue = 10000;
  const transferValue = 7000;

  // создаём роли, которые будем использовать в тесте
  [owner, user1, user2] = await ethers.getSigners();

  // деплоим контракт
  ERC20Factory = await ethers.getContractFactory("ERC20");
  erc20 = await ERC20Factory.deploy(name, symbol, decimals);
  await erc20.deployed();
  console.log(`ERC20 token ${name} deployed by address ${erc20.address}`)

  // минтим токены на аккаунт user1
  let tx = await erc20.mint(user1.address, totalValue);
  await tx.wait();
  let balanceUser1 = await erc20.balanceOf(user1.address);
  console.log(`Mint was successful.`);
  console.log(`   Balance account ${user1.address} is ${balanceUser1}`);

  // делаем трансфер с аккаунта user1 на аккаунт user2
  tx = await erc20.connect(user1).transfer(user2.address, transferValue);
  await tx.wait();
  balanceUser1 = await erc20.balanceOf(user1.address);
  let balanceUser2 = await erc20.balanceOf(user2.address);
  console.log(`Transfer was successful.`);
  console.log(`   Balance account ${user1.address} is ${balanceUser1}`);
  console.log(`   Balance account ${user2.address} is ${balanceUser2}`);
}

main().catch((error) => {
  console.log(error);
  process.exitCode = 1;
})