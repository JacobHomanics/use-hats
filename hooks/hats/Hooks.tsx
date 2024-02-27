import { useEffect, useMemo, useState } from "react";
import { HatsClient, MakeHatImmutableResult } from "@hatsprotocol/sdk-v1-core";
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
import { useAccount, usePublicClient, useWalletClient } from "wagmi";

//////////////////////////////////
//Initialization Functions
//////////////////////////////////
//////////////////////////////////

export function useHatsClient(chainId: number, publicClient: PublicClient, walletClient: WalletClient) {
  const [hatsClient, setHatsClient] = useState<HatsClient>();

  
  async function getHatsClient(chainId: number, publicClient: PublicClient, walletClient: WalletClient) {
    const hatsClient = new HatsClient({
      chainId,
      publicClient,
      walletClient,
    });

    setHatsClient(hatsClient);
  }

  useEffect(() => {
    if (!walletClient) return;

    getHatsClient(chainId, publicClient, walletClient);
  }, [walletClient, publicClient, chainId]);

  return { hatsClient, getHatsClient };
}

//////////////////////////////////
//Read Functions
//////////////////////////////////
//////////////////////////////////

export function useAccountCanClaim(hatsClient: HatsClient | undefined, hatId: string, account: `0x${string}` | undefined) {
  const [data, setData] = useState(false);

  async function getData(hatsClient: HatsClient | undefined, hatId: string, account: `0x${string}` | undefined) {
    if (!hatsClient) return;
    if (!account) return;

    const result = await hatsClient.accountCanClaim({
      hatId: BigInt(hatId),
      account,
    });

    setData(result);
  }

  useEffect(() => {
    getData(hatsClient, hatId, account);
  }, [hatsClient, account, hatId]);

  return { data, getData };
}

export function useCanClaimForAccount(hatsClient: HatsClient | undefined, hatId: string, account: `0x${string}` | undefined) {
  const [data, setData] = useState(false);

  async function getData(hatsClient: HatsClient | undefined, hatId: string, account: `0x${string}` | undefined) {
    if (!hatsClient) return;
    if (!account) return;

    const result = await hatsClient.canClaimForAccount({
      hatId: BigInt(hatId),
      account,
    });

    setData(result);
  }

  useEffect(() => {
    getData(hatsClient, hatId, account);
  }, [hatsClient, account, hatId]);

  return { data, getData };
}

export function useCopyTreeCallData(
  hatsClient: HatsClient | undefined,
  sourceTree: number,
  targetTree: number,
) {
  const [data, setData] = useState<{functionName: string, callData: `0x${string}`}[]>();

  async function getData(hatsClient: HatsClient | undefined, sourceTree: number, targetTree: number) {
    if (!hatsClient)
      return;

    const result = await hatsClient.copyTreeCallData({ sourceTree, targetTree });
    setData(result);
  }

  useEffect(()=> {
    getData(hatsClient, sourceTree, targetTree)
  }, [hatsClient, sourceTree, targetTree])

  return { data, getData };
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

  async function getData(hatsClient: HatsClient | undefined, admin: bigint,
    details: string,
    maxSupply: number,
    eligibility: `0x${string}`,
    toggle: `0x${string}`,
    mutable: boolean,
    imageURI?: string | undefined) {
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

  useEffect(()=> {
    getData(hatsClient, admin, details, maxSupply, eligibility, toggle, mutable, imageURI);
  }, [hatsClient, admin, details, maxSupply, eligibility, toggle, mutable, imageURI])
  return { data, getData };
}

export function useGetAdmin(
  hatsClient: HatsClient | undefined,
  hatId: bigint
) {
  const [data, setData] = useState<bigint>();

  async function getData(hatsClient: HatsClient | undefined, hatId: bigint) {
    if (!hatsClient) return;

    const result = await hatsClient.getAdmin(hatId);
    setData(result);
  }

  useEffect(()=> {
    getData(hatsClient, hatId);
  }, [hatsClient, hatId])

  return { data, getData };
}

export function useGetChildrenHats(
  hatsClient: HatsClient | undefined,
  hatId: bigint
) {
  const [data, setData] = useState<bigint[]>();

  async function getData(hatsClient: HatsClient | undefined, hatId: bigint) {
    if (!hatsClient) return;

    const result = await hatsClient.getChildrenHats(hatId);
    setData(result);
  }

  useEffect(()=> {
    getData(hatsClient, hatId);
  }, [hatsClient, hatId])

  return { data, getData };
}

export function useGetHatLevel(
  hatsClient: HatsClient | undefined,
  hatId: bigint
) {
  const [data, setData] = useState<number>();

  async function getData(hatsClient: HatsClient | undefined, hatId: bigint) {
    if (!hatsClient) return;

    const result = await hatsClient.getHatLevel(hatId);
    setData(result);
  }

  useEffect(()=> {
    getData(hatsClient, hatId);
  }, [hatsClient, hatId])

  return { data, getData };
}


export function useGetLinkageRequest(
  hatsClient: HatsClient | undefined,
  topHatDomain: number
) {
  const [data, setData] = useState<bigint>();

  async function getData(hatsClient: HatsClient | undefined, topHatDomain: number) {
    if (!hatsClient) return;

    const result = await hatsClient.getLinkageRequest(topHatDomain);
    setData(result);
  }

  useEffect(()=> {
    getData(hatsClient, topHatDomain)
  }, [hatsClient, topHatDomain])

  return { data, getData };
}

export function useGetLinkedTreeAdmin(
  hatsClient: HatsClient | undefined,
  topHatDomain: number
) {
  const [data, setData] = useState<bigint>();

  async function getData(hatsClient: HatsClient | undefined, topHatDomain: number) {
    if (!hatsClient) return;

    const result = await hatsClient.getLinkedTreeAdmin(topHatDomain);
    setData(result);
  }

  useEffect(()=> {
    getData(hatsClient, topHatDomain);
  }, [hatsClient, topHatDomain])

  return { data, getData };
}

export function useGetLocalHatLevel(
  hatsClient: HatsClient | undefined,
  hatId: bigint
) {
  const [data, setData] = useState<number>();

  async function getData(hatsClient: HatsClient | undefined, hatId: bigint) {
    if (!hatsClient) return;

    const result = await hatsClient.getLocalHatLevel(hatId);
    setData(result);
  }

  useEffect(()=> {
    getData(hatsClient, hatId);
  }, [hatsClient, hatId])
  return { data, getData };
}

export function useGetTippyTopHatDomain(
  hatsClient: HatsClient | undefined,
  topHatDomain: number
) {
  const [data, setData] = useState<number>();

  async function getData(hatsClient: HatsClient | undefined, topHatDomain: number) {
    if (!hatsClient) return;

    const result = await hatsClient.getTippyTopHatDomain(topHatDomain);
    setData(result);
  }

  useEffect(()=> {
    getData(hatsClient, topHatDomain)
  }, [hatsClient, topHatDomain])

  return { data, getData };
}

export function useGetTopHatDomain(
  hatsClient: HatsClient | undefined,
  hatId: bigint
) {
  const [data, setData] = useState<number>();

  async function getData(hatsClient: HatsClient | undefined, hatId: bigint) {
    if (!hatsClient) return;

    const result = await hatsClient.getTopHatDomain(hatId);
    setData(result);
  }

  useEffect(()=> {
    getData(hatsClient, hatId);
  }, [hatsClient, hatId])

  return { data, getData };
}

export function useGetTreesCount(
  hatsClient: HatsClient | undefined
) {
  const [data, setData] = useState<number>();

  async function getData(hatsClient: HatsClient | undefined) {
    if (!hatsClient) return;

    const result = await hatsClient.getTreesCount();
    setData(result);
  }

  useEffect(()=> {
    getData(hatsClient);
  }, [hatsClient])

  return { data, getData };
}

export function useIsActive(
  hatsClient: HatsClient | undefined,
  hatId: bigint
) {
  const [data, setData] = useState<boolean>();

  async function getData(hatsClient: HatsClient | undefined, hatId: bigint) {
    if (!hatsClient) return;

    const result = await hatsClient.isActive(hatId);
    setData(result);
  }

  useEffect(()=> {
    getData(hatsClient, hatId);
  }, [hatsClient, hatId])
  return { data, getData };
}

export function useIsAdminOfHat(
  hatsClient: HatsClient | undefined,
  user: `0x${string}`,
  hatId: bigint
) {
  const [data, setData] = useState<boolean>();

  async function getData(hatsClient: HatsClient | undefined, user: `0x${string}`, hatId: bigint) {
    if (!hatsClient) return;

    const result = await hatsClient.isAdminOfHat({user, hatId});

    setData(result);
  }

  useEffect(()=> {
    getData(hatsClient, user, hatId);
  }, [hatsClient, user, hatId]);

  return { data, getData };
}

export function useIsEligible(
  hatsClient: HatsClient | undefined,
  wearer: `0x${string}`,
  hatId: bigint
) {
  const [data, setData] = useState<boolean>();

  async function getData(hatsClient: HatsClient | undefined, wearer: `0x${string}`, hatId: bigint) {
    if (!hatsClient) return;

    const result = await hatsClient.isEligible({wearer, hatId});

    setData(result);
  }

  useEffect(()=> {
    getData(hatsClient, wearer, hatId);
  }, [hatsClient, wearer, hatId]);

  return { data, getData };
}

export function useIsInGoodStanding(
  hatsClient: HatsClient | undefined,
  wearer: `0x${string}`,
  hatId: bigint
) {
  const [data, setData] = useState<boolean>();

  async function getData(hatsClient: HatsClient | undefined, wearer: `0x${string}`, hatId: bigint) {
    if (!hatsClient) return;

    const result = await hatsClient.isInGoodStanding({wearer, hatId});

    setData(result);
  }

  useEffect(()=> {
    getData(hatsClient, wearer, hatId);
  }, [hatsClient, wearer, hatId]);

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
//////////////////////////////////
//////////////////////////////////
//Write Functions
//////////////////////////////////
//////////////////////////////////

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

  const writeAsync = useMemo(()=> {
    return () => write(hatsClient, account, topHatDomain, newAdminHat, newEligibility, newToggle, newDetails, newImageURI)
  }, [hatsClient, account, topHatDomain, newAdminHat, newEligibility, newToggle, newDetails, newImageURI]);

  async function write(hatsClient: HatsClient | undefined,
    account: `0x${string}` | undefined,
    topHatDomain: number,
    newAdminHat: bigint,
    newEligibility: `0x${string}` | undefined,
    newToggle: `0x${string}` | undefined,
    newDetails: string | undefined,
    newImageURI: string | undefined) {
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

  const writeAsync = useMemo(()=> {
    return () => write(hatsClient, account, admins, details, maxSupplies, eligibilityModules, toggleModules, mutables, imageURIs)
  }, [hatsClient, account, admins, details, maxSupplies, eligibilityModules, toggleModules, mutables, imageURIs]);

  async function write(hatsClient: HatsClient | undefined,
    account: `0x${string}` | undefined,
    admins: bigint[],
    details: string[],
    maxSupplies: number[],
    eligibilityModules: `0x${string}`[],
    toggleModules: `0x${string}`[],
    mutables: boolean[],
    imageURIs?: string[] | undefined,) {
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

  const writeAsync = useMemo(()=> {
    return () => write(hatsClient, account, hatIds, wearers)
  }, [hatsClient, account, hatIds, wearers]);


  async function write(hatsClient: HatsClient | undefined, account: `0x${string}` | undefined, hatIds: bigint[], wearers: `0x${string}`[],) {
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

  const writeAsync = useMemo(()=> {
    return () => write(hatsClient, account, hatId, newDetails)
  }, [hatsClient, account, hatId, newDetails]);

  async function write(  hatsClient: HatsClient | undefined, account: `0x${string}` | undefined, hatId: string, newDetails: string,) {
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

  const writeAsync = useMemo(()=> {
    return () => write(hatsClient, account, hatId, newEligibility)
  }, [hatsClient, account, hatId, newEligibility]);

  async function write(hatsClient: HatsClient | undefined, account: `0x${string}` | undefined, hatId: string, newEligibility: `0x${string}`,) {
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

  const writeAsync = useMemo(()=> {
    return () => write(hatsClient, account, hatId, newImageURI)
  }, [hatsClient, account, hatId, newImageURI]);

  async function write(  hatsClient: HatsClient | undefined, account: `0x${string}` | undefined, hatId: string, newImageURI: string,) {
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

  const writeAsync = useMemo(()=> {
    return () => write(hatsClient, account, hatId, newMaxSupply)
  }, [hatsClient, account, hatId, newMaxSupply]);

  async function write(hatsClient: HatsClient | undefined, account: `0x${string}` | undefined, hatId: string, newMaxSupply: number,) {
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

  const writeAsync = useMemo(()=> {
    return () => write(hatsClient, account, hatId, newToggle)
  }, [hatsClient, account, hatId, newToggle]);

  async function write(hatsClient: HatsClient | undefined, account: `0x${string}` | undefined, hatId: string, newToggle: `0x${string}`,) {
    if (!hatsClient) return;
    if (!account) return;

    const result = await hatsClient.changeHatToggle({ account, hatId: BigInt(hatId), newToggle });
    setData(result);
  }

  return { writeAsync, data };
}

export function useCheckHatStatus(hatsClient: HatsClient | undefined, account: `0x${string}` | undefined, hatId: string) {
  const [data, setData] = useState<CheckHatStatusResult>();

  const writeAsync = useMemo(()=> {
    return () => write(hatsClient, account, hatId)
  }, [hatsClient, account, hatId]);

  async function write(hatsClient: HatsClient | undefined, account: `0x${string}` | undefined, hatId: string) {
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

  const writeAsync = useMemo(()=> {
    return () => write(hatsClient, account, hatId, wearer)
  }, [hatsClient, account, hatId, wearer]);

  async function write(hatsClient: HatsClient | undefined, account: `0x${string}` | undefined, hatId: string, wearer: `0x${string}`,) {
    if (!hatsClient) return;
    if (!account) return;

    const result = await hatsClient.checkHatWearerStatus({ account, hatId: BigInt(hatId), wearer });
    setData(result);
  }

  return { data, writeAsync };
}

export function useClaimHat(hatsClient: HatsClient | undefined, account: `0x${string}` | undefined, hatId: string) {
  const [data, setData] = useState<ClaimResult>();

  const writeAsync = useMemo(()=> {
    return () => write(hatsClient, account, hatId)
  }, [hatsClient, account, hatId]);

  async function write(hatsClient: HatsClient | undefined, account: `0x${string}` | undefined, hatId: string) {
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

  const writeAsync = useMemo(()=> {
    return () => write(hatsClient, account, hatId, wearer)
  }, [hatsClient, account, hatId, wearer]);

  async function write(
    hatsClient: HatsClient | undefined,
    account: `0x${string}` | undefined,
    hatId: string,
    wearer: `0x${string}`,
    ) {
    if (!hatsClient) return;
    if (!account) return;

    const result = await hatsClient.claimHatFor({ account, hatId: BigInt(hatId), wearer });
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

  const writeAsync = useMemo(()=> {
    return () => write(hatsClient, account, admin, details, maxSupply, eligibility, toggle, mutable, imageURI)
  }, [hatsClient, account, admin, details, maxSupply, eligibility, toggle, mutable, imageURI]);

  async function write(  hatsClient: HatsClient | undefined,
    account: `0x${string}` | undefined,
    admin: bigint,
        details: string,
        maxSupply: number,
        eligibility: `0x${string}`,
        toggle: `0x${string}`,
        mutable: boolean,
        imageURI?: string | undefined) {
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

export function useMakeHatImmutable(
  hatsClient: HatsClient | undefined,
  account: `0x${string}` | undefined,
  hatId: string,
) {
  const writeAsyncOverride = useMemo(()=> {
    return async (hatsClient: HatsClient | undefined, account: `0x${string}` | undefined, hatId: string) => {
      if (!hatsClient) return;
      if (!account) return;

      const result = await hatsClient.makeHatImmutable({ account, hatId: BigInt(hatId) });
      return result;
    }
  }, [hatsClient, account, hatId]);

  async function writeAsync() {
    return await writeAsyncOverride(hatsClient, account, hatId);
  }

  return { writeAsync, writeAsyncOverride };
}

async function yes() {
  const { data: walletClient } = useWalletClient();
  const publicClient = usePublicClient();
  const { hatsClient, getHatsClient } = useHatsClient(5, publicClient!, walletClient!);
  const account = useAccount();

  const { writeAsync, writeAsyncOverride } = useMakeHatImmutable(hatsClient, account.address, "0");

  const [data, setData] = useState<MakeHatImmutableResult>();

  async function callMe() {
    const res = await writeAsync();
    const res2 = await writeAsyncOverride(hatsClient, account.address, "0");

    setData(res2);

  }

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
