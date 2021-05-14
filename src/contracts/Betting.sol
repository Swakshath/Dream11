pragma solidity ^0.5.0;

contract Ownable {
    address public owner;

    constructor() public {
        owner = msg.sender;
    }

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

}

contract Betting is Ownable {

    address[][][] public playersaddrs;

    struct contestentered {
        uint users;
        mapping(address => uint64) teamsmap;   
    }

    struct contestsinmatch {
        uint contestid;
        mapping(uint => contestentered) contests;
    }

    mapping(uint => contestsinmatch) public matches;
    
    event contestentereds(
        uint contestid,
        uint64 teams,
        uint matchid
    );
    

    constructor() public {
        //playersaddrs.push([address(0)]);
        //contests[0].users=1;
        matches[0].contestid=0;
        matches[0].contests[0].users=1;
        playersaddrs.push([[address(0)]]);
    }

    function joincontest(uint _contestid, uint _matchid, uint64 _teams) public
    {
        matches[_matchid].contests[_contestid].teamsmap[msg.sender]= _teams;
        matches[_matchid].contests[_contestid].users++;
        playersaddrs[_matchid][_contestid].push(msg.sender);
        emit contestentereds(_contestid, _teams, _matchid);
    }

    function sendwinner(address payable _winner) public payable {
       _winner.transfer(1 ether);
            }

    function getcontests(uint _matchid) public view returns(uint) {
        return(matches[_matchid].contestid);
    }

    /*function getplayerteams(uint _contestid, uint _playernum) public view returns(uint64, address) {
        return (contests[_contestid].teamsmap[playersaddrs[_contestid][_playernum]], playersaddrs[_contestid][_playernum]);
        //return contests[0].teamsmap[playersaddrs[0][1]];
        //return playersaddrs[_contestid][_playernum];
    }*/

    function createcontest(uint _matchid) public {
        
        matches[_matchid].contestid++;
        playersaddrs[_matchid].push([address(0)]);
        matches[_matchid].contests[matches[_matchid].contestid].users++;


    }

    function addmatch(uint _matchid) public onlyOwner{
        matches[_matchid].contestid=0;
        matches[_matchid].contests[0].users=1;
        playersaddrs.push([[address(0)]]);
    }

    function() external payable { }

}

