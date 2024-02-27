import { useEffect, useState } from "react";
import { HatsClient } from "@hatsprotocol/sdk-v1-core";
import type {
  /*MintHatResult, RenounceHatResult, ,  MakeHatImmutableResult, , SetHatStatusResult, TransferHatResult, SetHatWearerStatusResult, CheckHatStatusResult, CheckHatWearerStatusResult, RequestLinkTopHatToTreeResult, */
  ApproveLinkTopHatToTreeResult,
  CreateHatResult, /*MintTopHatResult, */
  BatchCreateHatsResult,
  BatchMintHatsResult,
  ChangeHatDetailsResult,
  ChangeHatEligibilityResult,
  ChangeHatImageURIResult,
  ChangeHatMaxSupplyResult,
  ChangeHatToggleResult,
  CheckHatStatusResult,
  CheckHatWearerStatusResult,
  /*UnlinkTopHatFromTreeResult, RelinkTopHatWithinTreeResult, MultiCallResult, */
  ClaimResult,
} from "@hatsprotocol/sdk-v1-core/dist/types";
import { PublicClient, WalletClient } from "viem";

// Last function implemented: claimHatFor
// Last function implemented: claimHatFor
// Last function implemented: claimHatFor
// Last function implemented: claimHatFor
// Last function implemented: claimHatFor
// Last function implemented: claimHatFor
// Last function implemented: claimHatFor
// Last function implemented: claimHatFor
// Last function implemented: claimHatFor
// Last function implemented: claimHatFor
// Last function implemented: claimHatFor

//Initialization Functions

export function useHatsClient(chainId: number, publicClient: PublicClient, walletClient: WalletClient) {
  const [hatsClient, setHatsClient] = useState<HatsClient>();

  async function getHatsClient() {
    const hatsClient = new HatsClient({
      chainId,
      publicClient,
      walletClient,
    });

    setHatsClient(hatsClient);
  }

  useEffect(() => {
    if (!walletClient) return;

    getHatsClient();
  }, [walletClient, publicClient, chainId]);

  return { hatsClient, getHatsClient };
}

//Read Functions

export function useAccountCanClaim(hatsClient: HatsClient | undefined, hatId: string, account: `0x${string}` | undefined) {
  const [data, setData] = useState(false);

  async function getData() {
    if (!hatsClient) return;
    if (!account) return;

    const result = await hatsClient.accountCanClaim({
      hatId: BigInt(hatId),
      account,
    });

    setData(result);
  }

  useEffect(() => {
    getData();
  }, [hatsClient, account, hatId]);

  return { data, getData };
}

export function useCanClaimForAccount(hatsClient: HatsClient | undefined, hatId: string, account: `0x${string}` | undefined) {
  const [data, setData] = useState(false);

  async function getData() {
    if (!hatsClient) return;
    if (!account) return;

    const result = await hatsClient.canClaimForAccount({
      hatId: BigInt(hatId),
      account,
    });

    setData(result);
  }

  useEffect(() => {
    getData();
  }, [hatsClient, account, hatId]);

  return { data, getData };
}

export function useIsWearerOfHat(hatsClient: HatsClient | undefined, wearer: `0x${string}` | undefined, hatId: string) {
  const [data, setData] = useState(false);

  async function getData(hatsClient: HatsClient | undefined, wearer: `0x${string}` | undefined, hatId: string) {
    if (!hatsClient) return;
    if (!wearer) return;

    const result = await hatsClient.isWearerOfHat({ wearer, hatId: BigInt(hatId) });
    setData(result);
  }

  useEffect(() => {
    getData(hatsClient, wearer, hatId);
  }, [hatsClient, wearer, hatId]);

  return { data, getData };
}

export function useViewHat(hatsClient: HatsClient | undefined, hatId: string) {
  const [data, setData] = useState({
    details: "",
    maxSupply: 0,
    supply: 0,
    eligibility: "",
    toggle: "",
    imageUri: "",
    numChildren: 0,
    mutable: false,
    active: false,
  });

  async function getData(hatsClient: HatsClient | undefined, hatId: string) {
    if (!hatsClient) return;

    const result = await hatsClient.viewHat(BigInt(hatId));
    setData(result);
  }

  useEffect(() => {
    getData(hatsClient, hatId);
  }, [hatsClient, hatId]);

  return { data, getData };
}

//Write Functions

export function useApproveLinkTopHatToTree(
  hatsClient: HatsClient | undefined,
  account: `0x${string}` | undefined,
  topHatDomain: number,
  newAdminHat: bigint,
  newEligibility: `0x${string}` | undefined,
  newToggle: `0x${string}` | undefined,
  newDetails: string | undefined,
  newImageURI: string | undefined,
) {
  const [data, setData] = useState<ApproveLinkTopHatToTreeResult>();

  async function writeAsync() {
    if (!hatsClient) return;
    if (!account) return;

    const result = await hatsClient.approveLinkTopHatToTree({
      account,
      topHatDomain,
      newAdminHat,
      newEligibility,
      newToggle,
      newDetails,
      newImageURI,
    });
    setData(result);
  }

  return { writeAsync, data };
}

export function useBatchCreateHats(
  hatsClient: HatsClient | undefined,
  account: `0x${string}` | undefined,
  admins: bigint[],
  details: string[],
  maxSupplies: number[],
  eligibilityModules: `0x${string}`[],
  toggleModules: `0x${string}`[],
  mutables: boolean[],
  imageURIs?: string[] | undefined,
) {
  const [data, setData] = useState<BatchCreateHatsResult>();

  async function writeAsync() {
    if (!hatsClient) return;
    if (!account) return;

    const result = await hatsClient.batchCreateHats({
      account,
      admins,
      details,
      maxSupplies,
      eligibilityModules,
      toggleModules,
      mutables,
      imageURIs,
    });
    setData(result);
  }

  return { writeAsync, data };
}

export function useBatchMintHats(
  hatsClient: HatsClient | undefined,
  account: `0x${string}` | undefined,
  hatIds: bigint[],
  wearers: `0x${string}`[],
) {
  const [data, setData] = useState<BatchMintHatsResult>();

  async function writeAsync() {
    if (!hatsClient) return;
    if (!account) return;

    const result = await hatsClient.batchMintHats({ account, hatIds, wearers });
    setData(result);
  }

  return { writeAsync, data };
}

export function useChangeHatDetails(
  hatsClient: HatsClient | undefined,
  account: `0x${string}` | undefined,
  hatId: string,
  newDetails: string,
) {
  const [data, setData] = useState<ChangeHatDetailsResult>();

  async function writeAsync() {
    if (!hatsClient) return;
    if (!account) return;

    const result = await hatsClient.changeHatDetails({ account, hatId: BigInt(hatId), newDetails });
    setData(result);
  }

  return { writeAsync, data };
}

export function useChangeHatEligibility(
  hatsClient: HatsClient | undefined,
  account: `0x${string}` | undefined,
  hatId: string,
  newEligibility: `0x${string}`,
) {
  const [data, setData] = useState<ChangeHatEligibilityResult>();

  async function writeAsync() {
    if (!hatsClient) return;
    if (!account) return;

    const result = await hatsClient.changeHatEligibility({ account, hatId: BigInt(hatId), newEligibility });
    setData(result);
  }

  return { writeAsync, data };
}

export function useChangeHatImageURI(
  hatsClient: HatsClient | undefined,
  account: `0x${string}` | undefined,
  hatId: string,
  newImageURI: string,
) {
  const [data, setData] = useState<ChangeHatImageURIResult>();

  async function writeAsync() {
    if (!hatsClient) return;
    if (!account) return;

    const result = await hatsClient.changeHatImageURI({ account, hatId: BigInt(hatId), newImageURI });
    setData(result);
  }

  return { writeAsync, data };
}

export function useChangeHatMaxSupply(
  hatsClient: HatsClient | undefined,
  account: `0x${string}` | undefined,
  hatId: string,
  newMaxSupply: number,
) {
  const [data, setData] = useState<ChangeHatMaxSupplyResult>();

  async function writeAsync() {
    if (!hatsClient) return;
    if (!account) return;

    const result = await hatsClient.changeHatMaxSupply({ account, hatId: BigInt(hatId), newMaxSupply });
    setData(result);
  }

  return { writeAsync, data };
}

export function useChangeHatToggle(
  hatsClient: HatsClient | undefined,
  account: `0x${string}` | undefined,
  hatId: string,
  newToggle: `0x${string}`,
) {
  const [data, setData] = useState<ChangeHatToggleResult>();

  async function writeAsync() {
    if (!hatsClient) return;
    if (!account) return;

    const result = await hatsClient.changeHatToggle({ account, hatId: BigInt(hatId), newToggle });
    setData(result);
  }

  return { writeAsync, data };
}

export function useCheckHatStatus(hatsClient: HatsClient | undefined, account: `0x${string}` | undefined, hatId: string) {
  const [data, setData] = useState<CheckHatStatusResult>();

  async function writeAsync() {
    if (!hatsClient) return;
    if (!account) return;

    const result = await hatsClient.checkHatStatus({ account, hatId: BigInt(hatId) });
    setData(result);
  }

  return { data, writeAsync };
}

export function useCheckHatWearerStatus(
  hatsClient: HatsClient | undefined,
  account: `0x${string}` | undefined,
  hatId: string,
  wearer: `0x${string}`,
) {
  const [data, setData] = useState<CheckHatWearerStatusResult>();

  async function writeAsync() {
    if (!hatsClient) return;
    if (!account) return;

    const result = await hatsClient.checkHatWearerStatus({ account, hatId: BigInt(hatId), wearer });
    setData(result);
  }

  return { data, writeAsync };
}

export function useClaimHat(hatsClient: HatsClient | undefined, account: `0x${string}` | undefined, hatId: string) {
  const [data, setData] = useState<ClaimResult>();

  async function writeAsync() {
    if (!hatsClient) return;
    if (!account) return;

    const result = await hatsClient.claimHat({ account, hatId: BigInt(hatId) });
    setData(result);
  }

  return { writeAsync, data };
}

export function useClaimHatFor(
  hatsClient: HatsClient | undefined,
  account: `0x${string}` | undefined,
  hatId: string,
  wearer: `0x${string}`,
) {
  const [data, setData] = useState<ClaimResult>();

  async function writeAsync() {
    if (!hatsClient) return;
    if (!account) return;

    const result = await hatsClient.claimHatFor({ account, hatId: BigInt(hatId), wearer });
    setData(result);
  }

  return { writeAsync, data };
}
export function useCopyTreeCallData(
  hatsClient: HatsClient | undefined,
  sourceTree: number,
  targetTree: number,
) {
  const [data, setData] = useState<{functionName: string, callData: `0x${string}`}[]>();

  async function writeAsync() {
    if (!hatsClient) return;

    const result = await hatsClient.copyTreeCallData({ sourceTree, targetTree });
    setData(result);
  }

  return { writeAsync, data };
}

export function useCreateHat(
  hatsClient: HatsClient | undefined,
  account: `0x${string}` | undefined,
  admin: bigint,
      details: string,
      maxSupply: number,
      eligibility: `0x${string}`,
      toggle: `0x${string}`,
      mutable: boolean,
      imageURI?: string | undefined

) {
  const [data, setData] = useState<CreateHatResult>();

  async function writeAsync() {
    if (!hatsClient) return;
    if (!account) return;

    const result = await hatsClient.createHat({  account,
      admin,
      details,
      maxSupply,
      eligibility,
      toggle,
      mutable,
      imageURI,
 });
    setData(result);
  }

  return { writeAsync, data };
}

export function useCreateHatCallData(
  hatsClient: HatsClient | undefined,
  admin: bigint,
  details: string,
  maxSupply: number,
  eligibility: `0x${string}`,
  toggle: `0x${string}`,
  mutable: boolean,
  imageURI?: string | undefined
) {
  const [data, setData] = useState<{functionName: string, callData: `0x${string}`}>();

  async function writeAsync() {
    if (!hatsClient) return;

    const result = hatsClient.createHatCallData({  
      admin,
      details,
      maxSupply,
      eligibility,
      toggle,
      mutable,
      imageURI,
 });
    setData(result);
  }

  return { writeAsync, data };
}

export function useGetAdmin(
  hatsClient: HatsClient | undefined,
  hatId: bigint
) {
  const [data, setData] = useState<bigint>();

  async function writeAsync() {
    if (!hatsClient) return;

    const result = await hatsClient.getAdmin(hatId);
    setData(result);
  }

  return { writeAsync, data };
}

export function useGetChildrenHats(
  hatsClient: HatsClient | undefined,
  hatId: bigint
) {
  const [data, setData] = useState<bigint[]>();

  async function writeAsync() {
    if (!hatsClient) return;

    const result = await hatsClient.getChildrenHats(hatId);
    setData(result);
  }

  return { writeAsync, data };
}

export function useGetHatLevel(
  hatsClient: HatsClient | undefined,
  hatId: bigint
) {
  const [data, setData] = useState<number>();

  async function writeAsync() {
    if (!hatsClient) return;

    const result = await hatsClient.getHatLevel(hatId);
    setData(result);
  }

  return { writeAsync, data };
}


export function useGetLinkageRequest(
  hatsClient: HatsClient | undefined,
  topHatDomain: number
) {
  const [data, setData] = useState<bigint>();

  async function writeAsync() {
    if (!hatsClient) return;

    const result = await hatsClient.getLinkageRequest(topHatDomain);
    setData(result);
  }

  return { writeAsync, data };
}




// export function useHatsClientRead(hatsClient: HatsClient, functionName: string, args: object[]) {
//     async function clientRead(hatsClient: HatsClient, functionName: string, args: object[]) {
//         await hatsClient[functionName](args);
//     }
// }

// export function useHatsClientWrite(hatsClient: HatsClient, functionName: string, args: object[]) {
//     async function clientWrite(hatsClient: HatsClient, functionName: string, args: object[]) {
//         await hatsClient[functionName](args);
//     }
// }
