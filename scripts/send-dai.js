
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

    
    // Get dai holder balance
    let balance = await daiContract.methods.balanceOf(daiHolder).call();
    console.log("Dai Holder Balance", balance);

    // Get a recipient
    const receiver = "0x66c57bf505a85a74609d2c83e94aabb26d691e1f"

    // Send dai to recipient
    await daiContract.methods
      .transfer(receiver , web3.utils.toWei('1','Ether'))
      .send({ from: daiHolder });

    // Get recipient dai balance
    balance = await daiContract.methods.balanceOf(receiver).call();
    console.log("Recipient Balance", balance);
  } catch (error) {
    console.log(error);
  }

  callback();
};

