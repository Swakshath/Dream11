pragma solidity ^0.5.0;

contract Betting {

    uint public contestid = 0;

    address[][] public playersaddrs;

    struct contestentered {
        uint users;
        mapping(address => uint64) teamsmap;   
    }

    mapping(uint => contestentered) public contests;
    
    event contestentereds(
        uint contestid,
        uint64 teams
    );
    

    constructor() public {
        playersaddrs.push([address(0)]);
        contests[0].users=1;
        //joincontest(1, 397);
    }

    function joincontest(uint _contestid, uint64 _teams) public
    {
        contests[_contestid].teamsmap[msg.sender]= _teams;
        contests[_contestid].users++;
        playersaddrs[_contestid].push(msg.sender);
        emit contestentereds(_contestid, _teams);
    }

    function sendwinner(address payable _winner) public payable {
       _winner.transfer(1 ether);
            }

    function getplayerteams(uint _contestid, uint _playernum) public view returns(uint64, address) {
        return (contests[_contestid].teamsmap[playersaddrs[_contestid][_playernum]], playersaddrs[_contestid][_playernum]);
        //return contests[0].teamsmap[playersaddrs[0][1]];
        //return playersaddrs[_contestid][_playernum];
    }

    function createcontest() public {
        
        contestid++;
        playersaddrs.push([address(0)]);
        contests[contestid].users++;


    }

    function() external payable { }

}

