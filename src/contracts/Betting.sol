pragma solidity ^0.5.0;

contract Betting {

    uint public contestid = 1;

    struct contestentered {
        uint users;
        mapping(address => uint64) teamsmap;   
    }

    mapping(uint => contestentered) contests;
    
    event contestentereds(
        uint contestid,
        uint64 teams
    );
    

    constructor() public {
        contests[1].users=0;
        //joincontest(1, 397);
    }

    function joincontest(uint _contestid, uint64 _teams) public
    {
        contests[_contestid].teamsmap[msg.sender]= _teams;
        contests[_contestid].users++;
        emit contestentereds(_contestid, _teams);
    }

    function sendwinner() public payable {
       msg.sender.transfer(1 ether);
            }

    function() external payable { }

}