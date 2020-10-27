
const DaiFaucet = artifacts.require("./DaiFaucet.sol")
// Reduced ABI for Balance Of and Trasnfer Only
const DAI_ABI= [
  {
    constant: false,
    inputs: [
      {
        name: "_to",
        type: "address",
      },
      {
        name: "_value",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        name: "_owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        name: "balance",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
]
  const DAI_ADDRESS = "0x6b175474e89094c44da98b954eedeac495271d0f";
  const daiContract = new web3.eth.Contract(DAI_ABI, DAI_ADDRESS);
  
  const daiHolder = "0x5921c191fe58175b1fb8943ed3f17345e615ff02";
  
  module.exports = async (callback) => {
    try {
        // Fetch Faucet
        faucetContract = await DaiFaucet.deployed()

        // Send Dai to Faucet
        await daiContract.methods.transfer(faucetContract.address, web3.utils.toWei('100', 'Ether')).send({ from: daiHolder});

        // Get a recipient
        const accounts = await web3.eth.getAccounts()
        const recipient = accounts[0]

        balance = await daiContract.methods.balanceOf(recipient).call()
        console.log("Recipient balance before transfer", balance)

        // Request dai from Faucet
        await faucetContract.requestDai({ from: recipient})

        
        // Get recipient dai balance
        balance = await daiContract.methods.balanceOf(recipient).call()
        console.log("Recipient balance", balance)

      
    
    } catch (error) {
     
    }
  
    callback();
  };
  