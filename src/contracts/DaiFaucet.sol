pragma solidity >=0.4.21 <0.6.0;

interface DaiToken {
    function transfer(address to, uint256 amount) external returns (bool);
}

contract DaiFaucet {
    DaiToken daiToken = DaiToken(0x6B175474E89094C44Da98b954EedeAC495271d0F);

    function requestDai() public {
        daiToken.transfer(msg.sender, 2000000000000000000);
        // Transfer Dai to Calleer
    }
}
