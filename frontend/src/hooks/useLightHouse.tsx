import React from 'react';
import { ethers } from 'ethers';
import lighthouse from '@lighthouse-web3/sdk';
import { useState } from 'react';

declare const window: any;
function useLightHouse() {
  const [cid, SetCid] = useState('');
  const [account, setAccount] = useState('');
  let uploadFileEncrypted!: (file: any) => void;
  const encryptionSignature = async () => {
    if (typeof window != 'undefined') {
      const { ethereum } = window;

      if (!ethereum) {
        alert('please install metamask');
      }
      if (ethereum) {
        const accounts = await ethereum.request({
          method: 'eth_requestAccounts',
        });

        window.ethereum.on('chainChanged', () => {
          window.location.reload();
        });

        window.ethereum.on('accountsChanged', () => {
          window.location.reload();
        });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        const messageRequested = (await lighthouse.getAuthMessage(address)).data
          .message;
        const signedMessage = await signer.signMessage(messageRequested);
        setAccount(accounts[0]);
        return {
          signedMessage: signedMessage,
          publicKey: address,
        };
      }
    }
    const progressCallback = (progressData: any) => {
      let percentageDone =
        //@ts-ignore
        100 - (progressData?.total / progressData?.uploaded)?.toFixed(2);
      console.log(percentageDone);
    };

    /* Deploy file along with encryption */
    uploadFileEncrypted = async (file: any) => {
      /*
       uploadEncrypted(e, accessToken, publicKey, signedMessage, uploadProgressCallback)
       - e: js event
       - accessToken: your API key
       - publicKey: wallets public key
       - signedMessage: message signed by the owner of publicKey
       - dealParameters: default null
       - uploadProgressCallback: function to get progress (optional)
    */
      const sig = await encryptionSignature();
      const response = await lighthouse.uploadEncrypted(
        file,
        'YOUR_API_KEY',
        sig?.publicKey as string,
        sig?.signedMessage as string,
        undefined,
        progressCallback
      );
      console.log(response.data);
      const { Hash } = response.data[0];
      SetCid(Hash);
      /*
      output:
        data: [{
          Name: "c04b017b6b9d1c189e15e6559aeb3ca8.png",
          Size: "318557",
          Hash: "QmcuuAtmYqbPYmPx3vhJvPDi61zMxYvJbfENMjBQjq7aM3"
        }]
      Note: Hash in response is CID.
    */
    };
  };

  return {
    encryptionSignature,
    account,
    uploadFileEncrypted,
  };
  //      <div className="App">
  //        <div className="text-center flex justify-center items-center mt-1">
  //     <div>
  //       {account !== '' ? (
  //                 <p>Connected Account: {account}</p>
  //             ) : (
  //                 <button onClick={()=>encryptionSignature()}>Connect Metmask</button>
  //             )}
  //                 </div>
  //                 {cid}
  // </div>
  //       <input onChange={e=>uploadFileEncrypted(e.target.files)} type="file" />

  //           <a href={`https://files.lighthouse.storage/viewFile/${cid}`} >View File</a>

  //     </div>
}

export default useLightHouse;
