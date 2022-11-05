// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
// import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./Ip3Struct.sol";

interface IERC20 {
    //Some interface non-implemented functions here
    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) external returns (bool);
}

/**
 *@title IP3 for lend NFT IP
 *@notice Contract demo
 */
contract IP3 {
    /*//////////////////////////////////////////////////////////////
                           PRICING PARAMETERS
    //////////////////////////////////////////////////////////////*/

    IERC20 acceptedUSDT;
    mapping(bytes32 => AuthorizeRecord) authroizeRecordMap; // hash of AuthorizedNFT => record
    mapping(bytes32 => AuthorizeCertificate) authorizeCertificateMap; // hash of AuthorizeCertificate => certificate

    event Purchased(
        bytes32 indexed hashedAuthorizeNFT,
        bytes32 indexed hashedAuthorizeCertificate,
        address indexed renterAddress,
        AuthorizedNFT authorizedNFT,
        AuthorizeCertificate authorizeCertificate
    );

    constructor(IERC20 instanceAddress) {
        acceptedUSDT = instanceAddress;
    }

    /*//////////////////////////////////////////////////////////////
                    PURCHASING CERTIFICATE
    //////////////////////////////////////////////////////////////*/

    /**
     *@dev purchase authorization certificate
     *@param _term, the term the NFT can be authorized
     */
    function purchaseAuthorization(
        AuthorizedNFT memory _authorizedNFT,
        Term memory _term
    ) external {
        ///@dev temporary purchase with CountOnly, will update more options.

        // DurationOnly
        if (_authorizedNFT.rentalType == RentalType.DurationOnly) {
            purchaseByDuration(
                _authorizedNFT,
                _term.authorizedStartTime,
                _term.authorizedEndTime,
                msg.sender
            );
            // purchase(_authorizedNFT, msg.sender);

            // Countonly
        } else {
            purchaseCount(_authorizedNFT, _term.count, msg.sender);
            // purchase(_authorizedNFT, msg.sender);
        }
    }

    /*//////////////////////////////////////////////////////////////
                    HELPER FUNCTIONS
    //////////////////////////////////////////////////////////////*/

    receive() external payable {
        //not accepting unsolicited ether
        revert("Reason");
    }

    function purchaseByAmount(
        AuthorizedNFT memory _authorizedNFT,
        uint256 _count,
        address _renterAddress
    ) private {
        //use IERC20 instance to perform the exchange here
        uint256 termedPrice;
        // first get approved amount from USDT approve, then can purchase this
        bytes32 hashedAuthorizeNFT = hashAuthorizeNFT(_authorizedNFT);
        uint256 price = _authorizedNFT.nft.currentPrice;
        if (price == 0) {
            price = 1;
            termedPrice = price;
            acceptedUSDT.transferFrom(msg.sender, address(this), price);
        } else {
            termedPrice = price;
            price *= 2;
            acceptedUSDT.transferFrom(msg.sender, address(this), price);
        }

        ///@dev temporary use Count option and count=1, will update the options later.
        //https://ethereum.stackexchange.com/questions/1511/how-to-initialize-a-struct
        Term memory newTerm = Term(0, 0, _count);
        bytes32 singature = hashedAuthorizeNFT; //TODO: authrizednft
        AuthorizeCertificate
            memory newAuthorizeCertificate = AuthorizeCertificate(
                _authorizedNFT,
                newTerm,
                _renterAddress,
                termedPrice,
                singature
            );

        bytes32 hashedCertificate = keccak256(
            abi.encodePacked(
                hashedAuthorizeNFT,
                hashTerm(newTerm),
                _renterAddress,
                termedPrice,
                singature
            )
        );

        bytes32 hashedNft = hashNftInfo(_authorizedNFT.nft);
        // update AuthroizedNFT record
        authroizeRecordMap[hashedNft].totalAuthorizedCount += 1;
        authroizeRecordMap[hashedNft].totalTransactionRevenue += termedPrice;

        // update authorizeCertificateMap
        authorizeCertificateMap[hashedCertificate] = newAuthorizeCertificate;

        emit Purchased(
            hashedNft,
            hashedCertificate,
            msg.sender,
            _authorizedNFT,
            newAuthorizeCertificate
        );
    }

    function purchaseByDuration(
        AuthorizedNFT memory _authorizedNFT,
        uint256 _startTime,
        uint256 _endTime,
        address _renterAddress
    ) private {
        //use IERC20 instance to perform the exchange here
        uint256 termedPrice;
        // first get approved amount from USDT approve, then can purchase this
        bytes32 hashedAuthorizeNFT = hashAuthorizeNFT(_authorizedNFT);
        uint256 price = _authorizedNFT.nft.currentPrice;
        if (price == 0) {
            price = 1;
            termedPrice = price;
            acceptedUSDT.transferFrom(msg.sender, address(this), price);
        } else {
            termedPrice = price;
            price *= 2;
            acceptedUSDT.transferFrom(msg.sender, address(this), price);
        }

        ///@dev temporary use Count option and count=1, will update the options later.
        //https://ethereum.stackexchange.com/questions/1511/how-to-initialize-a-struct
        Term memory newTerm = Term(_startTime, _endTime, 0);
        bytes32 singature = hashedAuthorizeNFT; // TODO: Tempoary set to be hashed NFT
        AuthorizeCertificate
            memory newAuthorizeCertificate = AuthorizeCertificate(
                _authorizedNFT,
                newTerm,
                _renterAddress,
                termedPrice,
                singature
            );

        bytes32 hashedCertificate = keccak256(
            abi.encodePacked(
                hashedAuthorizeNFT,
                hashTerm(newTerm),
                _renterAddress,
                termedPrice,
                singature
            )
        );

        bytes32 hashedNft = hashNftInfo(_authorizedNFT.nft);
        // update AuthroizedNFT record
        authroizeRecordMap[hashedNft].totalAuthorizedCount += 1;
        authroizeRecordMap[hashedNft].totalTransactionRevenue += termedPrice;

        // update authorizeCertificateMap
        authorizeCertificateMap[hashedCertificate] = newAuthorizeCertificate;

        emit Purchased(
            hashedNft,
            hashedCertificate,
            msg.sender,
            _authorizedNFT,
            newAuthorizeCertificate
        );
    }

    function hashNftInfo(NFT memory _nft) private pure returns (bytes32) {
        return
            keccak256(
                abi.encodePacked(_nft.chainId, _nft.NFTAddress, _nft.tokenId)
            );
    }

    function hashAuthorizeNFT(AuthorizedNFT memory _authorizedNFT)
        private
        pure
        returns (bytes32)
    {
        return
            keccak256(
                abi.encodePacked(
                    _authorizedNFT.nft.chainId,
                    _authorizedNFT.nft.NFTAddress,
                    _authorizedNFT.nft.tokenId,
                    _authorizedNFT.nft.currentPrice,
                    _authorizedNFT.rentalType,
                    _authorizedNFT.authorizer.nftHolder,
                    _authorizedNFT.authorizer.claimAddress,
                    _authorizedNFT.listStartTime,
                    _authorizedNFT.listEndTime
                )
            );
    }

    function hashTerm(Term memory _term) private pure returns (bytes32) {
        return
            keccak256(
                abi.encodePacked(
                    _term.authorizedStartTime,
                    _term.authorizedEndTime,
                    _term.count
                )
            );
    }

    /*//////////////////////////////////////////////////////////////
                    GETTER FUNCTIONS
    //////////////////////////////////////////////////////////////*/

    function getAuthroizeRecordMap(bytes32 _hashedNFTInfo)
        external
        view
        returns (AuthorizeRecord memory)
    {
        return authroizeRecordMap[_hashedNFTInfo];
    }

    function getAuthroizeCertificateMap(bytes32 _hashedCertificate)
        external
        view
        returns (AuthorizeCertificate memory)
    {
        return authorizeCertificateMap[_hashedCertificate];
    }
}