import { useEffect, useMemo, useState } from "react";
import { HatsClient } from "@hatsprotocol/sdk-v1-core";
import { PublicClient, WalletClient, Hex, toHex, Account } from "viem";
import { useAccount, usePublicClient, useWalletClient } from "wagmi";

//////////////////////////////////
//Initialization Functions
//////////////////////////////////
//////////////////////////////////

export function useHatsClient(
  chainId: number,
  publicClient: PublicClient,
  walletClient: WalletClient
) {
  const [hatsClient, setHatsClient] = useState<HatsClient>();

  async function getHatsClient(
    chainId: number,
    publicClient: PublicClient,
    walletClient: WalletClient
  ) {
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

export function useAccountCanClaim(
  hatsClient: HatsClient | undefined,
  hatId: string,
  account: `0x${string}` | undefined
) {
  const [data, setData] = useState(false);

  async function getData(
    hatsClient: HatsClient | undefined,
    hatId: string,
    account: `0x${string}` | undefined
  ) {
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

export function useCanClaimForAccount(
  hatsClient: HatsClient | undefined,
  hatId: string,
  account: `0x${string}` | undefined
) {
  const [data, setData] = useState(false);

  async function getData(
    hatsClient: HatsClient | undefined,
    hatId: string,
    account: `0x${string}` | undefined
  ) {
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
  targetTree: number
) {
  const [data, setData] =
    useState<{ functionName: string; callData: `0x${string}` }[]>();

  async function getData(
    hatsClient: HatsClient | undefined,
    sourceTree: number,
    targetTree: number
  ) {
    if (!hatsClient) return;

    const result = await hatsClient.copyTreeCallData({
      sourceTree,
      targetTree,
    });
    setData(result);
  }

  useEffect(() => {
    getData(hatsClient, sourceTree, targetTree);
  }, [hatsClient, sourceTree, targetTree]);

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
  const [data, setData] = useState<{
    functionName: string;
    callData: `0x${string}`;
  }>();

  async function getData(
    hatsClient: HatsClient | undefined,
    admin: bigint,
    details: string,
    maxSupply: number,
    eligibility: `0x${string}`,
    toggle: `0x${string}`,
    mutable: boolean,
    imageURI?: string | undefined
  ) {
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

  useEffect(() => {
    getData(
      hatsClient,
      admin,
      details,
      maxSupply,
      eligibility,
      toggle,
      mutable,
      imageURI
    );
  }, [
    hatsClient,
    admin,
    details,
    maxSupply,
    eligibility,
    toggle,
    mutable,
    imageURI,
  ]);
  return { data, getData };
}

export function useGetAdmin(hatsClient: HatsClient | undefined, hatId: bigint) {
  const [data, setData] = useState<bigint>();

  async function getData(hatsClient: HatsClient | undefined, hatId: bigint) {
    if (!hatsClient) return;

    const result = await hatsClient.getAdmin(hatId);
    setData(result);
  }

  useEffect(() => {
    getData(hatsClient, hatId);
  }, [hatsClient, hatId]);

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

  useEffect(() => {
    getData(hatsClient, hatId);
  }, [hatsClient, hatId]);

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

  useEffect(() => {
    getData(hatsClient, hatId);
  }, [hatsClient, hatId]);

  return { data, getData };
}

export function useGetLinkageRequest(
  hatsClient: HatsClient | undefined,
  topHatDomain: number
) {
  const [data, setData] = useState<bigint>();

  async function getData(
    hatsClient: HatsClient | undefined,
    topHatDomain: number
  ) {
    if (!hatsClient) return;

    const result = await hatsClient.getLinkageRequest(topHatDomain);
    setData(result);
  }

  useEffect(() => {
    getData(hatsClient, topHatDomain);
  }, [hatsClient, topHatDomain]);

  return { data, getData };
}

export function useGetLinkedTreeAdmin(
  hatsClient: HatsClient | undefined,
  topHatDomain: number
) {
  const [data, setData] = useState<bigint>();

  async function getData(
    hatsClient: HatsClient | undefined,
    topHatDomain: number
  ) {
    if (!hatsClient) return;

    const result = await hatsClient.getLinkedTreeAdmin(topHatDomain);
    setData(result);
  }

  useEffect(() => {
    getData(hatsClient, topHatDomain);
  }, [hatsClient, topHatDomain]);

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

  useEffect(() => {
    getData(hatsClient, hatId);
  }, [hatsClient, hatId]);
  return { data, getData };
}

export function useGetTippyTopHatDomain(
  hatsClient: HatsClient | undefined,
  topHatDomain: number
) {
  const [data, setData] = useState<number>();

  async function getData(
    hatsClient: HatsClient | undefined,
    topHatDomain: number
  ) {
    if (!hatsClient) return;

    const result = await hatsClient.getTippyTopHatDomain(topHatDomain);
    setData(result);
  }

  useEffect(() => {
    getData(hatsClient, topHatDomain);
  }, [hatsClient, topHatDomain]);

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

  useEffect(() => {
    getData(hatsClient, hatId);
  }, [hatsClient, hatId]);

  return { data, getData };
}

export function useGetTreesCount(hatsClient: HatsClient | undefined) {
  const [data, setData] = useState<number>();

  async function getData(hatsClient: HatsClient | undefined) {
    if (!hatsClient) return;

    const result = await hatsClient.getTreesCount();
    setData(result);
  }

  useEffect(() => {
    getData(hatsClient);
  }, [hatsClient]);

  return { data, getData };
}

export function useIsActive(hatsClient: HatsClient | undefined, hatId: bigint) {
  const [data, setData] = useState<boolean>();

  async function getData(hatsClient: HatsClient | undefined, hatId: bigint) {
    if (!hatsClient) return;

    const result = await hatsClient.isActive(hatId);
    setData(result);
  }

  useEffect(() => {
    getData(hatsClient, hatId);
  }, [hatsClient, hatId]);
  return { data, getData };
}

export function useIsAdminOfHat(
  hatsClient: HatsClient | undefined,
  user: `0x${string}`,
  hatId: bigint
) {
  const [data, setData] = useState<boolean>();

  async function getData(
    hatsClient: HatsClient | undefined,
    user: `0x${string}`,
    hatId: bigint
  ) {
    if (!hatsClient) return;

    const result = await hatsClient.isAdminOfHat({ user, hatId });

    setData(result);
  }

  useEffect(() => {
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

  async function getData(
    hatsClient: HatsClient | undefined,
    wearer: `0x${string}`,
    hatId: bigint
  ) {
    if (!hatsClient) return;

    const result = await hatsClient.isEligible({ wearer, hatId });

    setData(result);
  }

  useEffect(() => {
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

  async function getData(
    hatsClient: HatsClient | undefined,
    wearer: `0x${string}`,
    hatId: bigint
  ) {
    if (!hatsClient) return;

    const result = await hatsClient.isInGoodStanding({ wearer, hatId });

    setData(result);
  }

  useEffect(() => {
    getData(hatsClient, wearer, hatId);
  }, [hatsClient, wearer, hatId]);

  return { data, getData };
}

export function useIsWearerOfHat(
  hatsClient: HatsClient | undefined,
  wearer: `0x${string}` | undefined,
  hatId: string
) {
  const [data, setData] = useState(false);

  async function getData(
    hatsClient: HatsClient | undefined,
    wearer: `0x${string}` | undefined,
    hatId: string
  ) {
    if (!hatsClient) return;
    if (!wearer) return;

    const result = await hatsClient.isWearerOfHat({
      wearer,
      hatId: BigInt(hatId),
    });
    setData(result);
  }

  useEffect(() => {
    getData(hatsClient, wearer, hatId);
  }, [hatsClient, wearer, hatId]);

  return { data, getData };
}

export function useMakeHatImmutableCallData(
  hatsClient: HatsClient | undefined,
  hatId: string
) {
  const [data, setData] = useState({ functionName: "", callData: toHex("") });

  async function getData(hatsClient: HatsClient | undefined, hatId: string) {
    if (!hatsClient) return;

    const result = hatsClient.makeHatImmutableCallData({
      hatId: BigInt(hatId),
    });
    setData(result);
  }

  useEffect(() => {
    getData(hatsClient, hatId);
  }, [hatsClient, hatId]);

  return { data, getData };
}

export function useMintHatCallData(
  hatsClient: HatsClient | undefined,
  hatId: string,
  wearer: `0x${string}`
) {
  const [data, setData] = useState({ functionName: "", callData: toHex("") });

  async function getData(
    hatsClient: HatsClient | undefined,
    hatId: string,
    wearer: `0x${string}`
  ) {
    if (!hatsClient) return;

    const result = hatsClient.mintHatCallData({ hatId: BigInt(hatId), wearer });
    setData(result);
  }

  useEffect(() => {
    getData(hatsClient, hatId, wearer);
  }, [hatsClient, hatId, wearer]);

  return { data, getData };
}

export function useMintTopHatData(
  hatsClient: HatsClient | undefined,
  target: `0x${string}`,
  details: string,
  imageURI?: string | undefined
) {
  const [data, setData] = useState({ functionName: "", callData: toHex("") });

  async function getData(
    hatsClient: HatsClient | undefined,
    target: `0x${string}`,
    details: string,
    imageURI?: string | undefined
  ) {
    if (!hatsClient) return;

    const result = hatsClient.mintTopHatCallData({ target, details, imageURI });
    setData(result);
  }

  useEffect(() => {
    getData(hatsClient, target, details, imageURI);
  }, [hatsClient, target, details, imageURI]);

  return { data, getData };
}

export function useMulticallCallData(
  hatsClient: HatsClient | undefined,
  calls: `0x${string}`[]
) {
  const [data, setData] = useState({ functionName: "", callData: toHex("") });

  async function getData(
    hatsClient: HatsClient | undefined,
    calls: `0x${string}`[]
  ) {
    if (!hatsClient) return;

    const result = hatsClient.multicallCallData(calls);
    setData(result);
  }

  useEffect(() => {
    getData(hatsClient, calls);
  }, [hatsClient, calls]);

  return { data, getData };
}

export function usePredictNextChildrenHatIDs(
  hatsClient: HatsClient | undefined,
  admin: bigint,
  numChildren: number
) {
  const [data, setData] = useState<bigint[]>();

  async function getData(
    hatsClient: HatsClient | undefined,
    admin: bigint,
    numChildren: number
  ) {
    if (!hatsClient) return;

    const result = await hatsClient.predictNextChildrenHatIDs({
      admin,
      numChildren,
    });
    setData(result);
  }

  useEffect(() => {
    getData(hatsClient, admin, numChildren);
  }, [hatsClient, admin, numChildren]);

  return { data, getData };
}

export function useRelinkTopHatWithinTreeCallData(
  hatsClient: HatsClient | undefined,
  topHatDomain: number,
  newAdminHat: bigint,
  newEligibility?: `0x${string}` | undefined,
  newToggle?: `0x${string}` | undefined,
  newDetails?: string | undefined,
  newImageURI?: string | undefined
) {
  const [data, setData] = useState({ functionName: "", callData: toHex("") });

  async function getData(
    hatsClient: HatsClient | undefined,
    topHatDomain: number,
    newAdminHat: bigint,
    newEligibility?: `0x${string}` | undefined,
    newToggle?: `0x${string}` | undefined,
    newDetails?: string | undefined,
    newImageURI?: string | undefined
  ) {
    if (!hatsClient) return;

    const result = hatsClient.relinkTopHatWithinTreeCallData({
      topHatDomain,
      newAdminHat,
      newEligibility,
      newToggle,
      newDetails,
      newImageURI,
    });
    setData(result);
  }

  useEffect(() => {
    getData(
      hatsClient,
      topHatDomain,
      newAdminHat,
      newEligibility,
      newToggle,
      newDetails,
      newImageURI
    );
  }, [
    hatsClient,
    topHatDomain,
    newAdminHat,
    newEligibility,
    newToggle,
    newDetails,
    newImageURI,
  ]);

  return { data, getData };
}

export function useRenounceHatCallData(
  hatsClient: HatsClient | undefined,
  hatId: bigint
) {
  const [data, setData] = useState({ functionName: "", callData: toHex("") });

  async function getData(hatsClient: HatsClient | undefined, hatId: bigint) {
    if (!hatsClient) return;

    const result = hatsClient.renounceHatCallData({ hatId });
    setData(result);
  }

  useEffect(() => {
    getData(hatsClient, hatId);
  }, [hatsClient, hatId]);

  return { data, getData };
}

export function useRequestLinkTopHatToTreeCallData(
  hatsClient: HatsClient | undefined,
  topHatDomain: number,
  requestedAdminHat: bigint
) {
  const [data, setData] = useState({ functionName: "", callData: toHex("") });

  async function getData(
    hatsClient: HatsClient | undefined,
    topHatDomain: number,
    requestedAdminHat: bigint
  ) {
    if (!hatsClient) return;

    const result = hatsClient.requestLinkTopHatToTreeCallData({
      topHatDomain,
      requestedAdminHat,
    });
    setData(result);
  }

  useEffect(() => {
    getData(hatsClient, topHatDomain, requestedAdminHat);
  }, [hatsClient, topHatDomain, requestedAdminHat]);

  return { data, getData };
}

export function useSetHatStatusCallData(
  hatsClient: HatsClient | undefined,
  hatId: bigint,
  newStatus: boolean
) {
  const [data, setData] = useState({ functionName: "", callData: toHex("") });

  async function getData(
    hatsClient: HatsClient | undefined,
    hatId: bigint,
    newStatus: boolean
  ) {
    if (!hatsClient) return;

    const result = hatsClient.setHatStatusCallData({ hatId, newStatus });
    setData(result);
  }

  useEffect(() => {
    getData(hatsClient, hatId, newStatus);
  }, [hatsClient, hatId, newStatus]);

  return { data, getData };
}

export function useSetHatWearerStatusCallData(
  hatsClient: HatsClient | undefined,
  hatId: bigint,
  wearer: `0x${string}`,
  eligible: boolean,
  standing: boolean
) {
  const [data, setData] = useState({ functionName: "", callData: toHex("") });

  async function getData(
    hatsClient: HatsClient | undefined,
    hatId: bigint,
    wearer: `0x${string}`,
    eligible: boolean,
    standing: boolean
  ) {
    if (!hatsClient) return;

    const result = hatsClient.setHatWearerStatusCallData({
      hatId,
      wearer,
      eligible,
      standing,
    });
    setData(result);
  }

  useEffect(() => {
    getData(hatsClient, hatId, wearer, eligible, standing);
  }, [hatsClient, hatId, wearer, eligible, standing]);

  return { data, getData };
}

export function useTransferHatCallData(
  hatsClient: HatsClient | undefined,
  hatId: bigint,
  from: `0x${string}`,
  to: `0x${string}`
) {
  const [data, setData] = useState({ functionName: "", callData: toHex("") });

  async function getData(
    hatsClient: HatsClient | undefined,
    hatId: bigint,
    from: `0x${string}`,
    to: `0x${string}`
  ) {
    if (!hatsClient) return;

    const result = hatsClient.transferHatCallData({
      hatId,
      from,
      to,
    });
    setData(result);
  }

  useEffect(() => {
    getData(hatsClient, hatId, from, to);
  }, [hatsClient, hatId, from, to]);

  return { data, getData };
}

export function useUnlinkTopHatFromTreeCallData(
  hatsClient: HatsClient | undefined,
  topHatDomain: number,
  wearer: `0x${string}`
) {
  const [data, setData] = useState({ functionName: "", callData: toHex("") });

  async function getData(
    hatsClient: HatsClient | undefined,
    topHatDomain: number,
    wearer: `0x${string}`
  ) {
    if (!hatsClient) return;

    const result = hatsClient.unlinkTopHatFromTreeCallData({
      topHatDomain,
      wearer,
    });
    setData(result);
  }

  useEffect(() => {
    getData(hatsClient, topHatDomain, wearer);
  }, [hatsClient, topHatDomain, wearer]);

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
  newImageURI: string | undefined
) {
  const writeAsyncOverride = useMemo(() => {
    return async (
      hatsClient: HatsClient | undefined,
      account: `0x${string}` | undefined,
      topHatDomain: number,
      newAdminHat: bigint,
      newEligibility: `0x${string}` | undefined,
      newToggle: `0x${string}` | undefined,
      newDetails: string | undefined,
      newImageURI: string | undefined
    ) => {
      if (!hatsClient) return;
      if (!account) return;

      return await hatsClient.approveLinkTopHatToTree({
        account,
        topHatDomain,
        newAdminHat,
        newEligibility,
        newToggle,
        newDetails,
        newImageURI,
      });
    };
  }, [
    hatsClient,
    account,
    topHatDomain,
    newAdminHat,
    newEligibility,
    newToggle,
    newDetails,
    newImageURI,
  ]);

  async function writeAsync() {
    return await writeAsyncOverride(
      hatsClient,
      account,
      topHatDomain,
      newAdminHat,
      newEligibility,
      newToggle,
      newDetails,
      newImageURI
    );
  }

  return { writeAsync, writeAsyncOverride };
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
  imageURIs?: string[] | undefined
) {
  const writeAsyncOverride = useMemo(() => {
    return async (
      hatsClient: HatsClient | undefined,
      account: `0x${string}` | undefined,
      admins: bigint[],
      details: string[],
      maxSupplies: number[],
      eligibilityModules: `0x${string}`[],
      toggleModules: `0x${string}`[],
      mutables: boolean[],
      imageURIs?: string[] | undefined
    ) => {
      if (!hatsClient) return;
      if (!account) return;

      return await hatsClient.batchCreateHats({
        account,
        admins,
        details,
        maxSupplies,
        eligibilityModules,
        toggleModules,
        mutables,
        imageURIs,
      });
    };
  }, [
    hatsClient,
    account,
    admins,
    details,
    maxSupplies,
    eligibilityModules,
    toggleModules,
    mutables,
    imageURIs,
  ]);

  async function writeAsync() {
    return await writeAsyncOverride(
      hatsClient,
      account,
      admins,
      details,
      maxSupplies,
      eligibilityModules,
      toggleModules,
      mutables,
      imageURIs
    );
  }

  return { writeAsync, writeAsyncOverride };
}

export function useBatchMintHats(
  hatsClient: HatsClient | undefined,
  account: `0x${string}` | undefined,
  hatIds: bigint[],
  wearers: `0x${string}`[]
) {
  const writeAsyncOverride = useMemo(() => {
    return async (
      hatsClient: HatsClient | undefined,
      account: `0x${string}` | undefined,
      hatIds: bigint[],
      wearers: `0x${string}`[]
    ) => {
      if (!hatsClient) return;
      if (!account) return;

      return await hatsClient.batchMintHats({ account, hatIds, wearers });
    };
  }, [hatsClient, account, hatIds, wearers]);

  async function writeAsync() {
    return await writeAsyncOverride(hatsClient, account, hatIds, wearers);
  }

  return { writeAsync, writeAsyncOverride };
}

export function useChangeHatDetails(
  hatsClient: HatsClient | undefined,
  account: `0x${string}` | undefined,
  hatId: string,
  newDetails: string
) {
  const writeAsyncOverride = useMemo(() => {
    return async (
      hatsClient: HatsClient | undefined,
      account: `0x${string}` | undefined,
      hatId: string,
      newDetails: string
    ) => {
      if (!hatsClient) return;
      if (!account) return;

      return await hatsClient.changeHatDetails({
        account,
        hatId: BigInt(hatId),
        newDetails,
      });
    };
  }, [hatsClient, account, hatId, newDetails]);

  async function writeAsync() {
    return await writeAsyncOverride(hatsClient, account, hatId, newDetails);
  }

  return { writeAsync, writeAsyncOverride };
}

export function useChangeHatEligibility(
  hatsClient: HatsClient | undefined,
  account: `0x${string}` | undefined,
  hatId: string,
  newEligibility: `0x${string}`
) {
  const writeAsyncOverride = useMemo(() => {
    return async (
      hatsClient: HatsClient | undefined,
      account: `0x${string}` | undefined,
      hatId: string,
      newEligibility: `0x${string}`
    ) => {
      if (!hatsClient) return;
      if (!account) return;

      return await hatsClient.changeHatEligibility({
        account,
        hatId: BigInt(hatId),
        newEligibility,
      });
    };
  }, [hatsClient, account, hatId, newEligibility]);

  async function writeAsync() {
    return await writeAsyncOverride(hatsClient, account, hatId, newEligibility);
  }

  return { writeAsync, writeAsyncOverride };
}

export function useChangeHatImageURI(
  hatsClient: HatsClient | undefined,
  account: `0x${string}` | undefined,
  hatId: string,
  newImageURI: string
) {
  const writeAsyncOverride = useMemo(() => {
    return async (
      hatsClient: HatsClient | undefined,
      account: `0x${string}` | undefined,
      hatId: string,
      newImageURI: string
    ) => {
      if (!hatsClient) return;
      if (!account) return;

      return await hatsClient.changeHatImageURI({
        account,
        hatId: BigInt(hatId),
        newImageURI,
      });
    };
  }, [hatsClient, account, hatId, newImageURI]);

  async function writeAsync() {
    return await writeAsyncOverride(hatsClient, account, hatId, newImageURI);
  }

  return { writeAsync, writeAsyncOverride };
}

export function useChangeHatMaxSupply(
  hatsClient: HatsClient | undefined,
  account: `0x${string}` | undefined,
  hatId: string,
  newMaxSupply: number
) {
  const writeAsyncOverride = useMemo(() => {
    return async (
      hatsClient: HatsClient | undefined,
      account: `0x${string}` | undefined,
      hatId: string,
      newMaxSupply: number
    ) => {
      if (!hatsClient) return;
      if (!account) return;

      return await hatsClient.changeHatMaxSupply({
        account,
        hatId: BigInt(hatId),
        newMaxSupply,
      });
    };
  }, [hatsClient, account, hatId, newMaxSupply]);

  async function writeAsync() {
    return await writeAsyncOverride(hatsClient, account, hatId, newMaxSupply);
  }

  return { writeAsync, writeAsyncOverride };
}

export function useChangeHatToggle(
  hatsClient: HatsClient | undefined,
  account: `0x${string}` | undefined,
  hatId: string,
  newToggle: `0x${string}`
) {
  const writeAsyncOverride = useMemo(() => {
    return async (
      hatsClient: HatsClient | undefined,
      account: `0x${string}` | undefined,
      hatId: string,
      newToggle: `0x${string}`
    ) => {
      if (!hatsClient) return;
      if (!account) return;

      return await hatsClient.changeHatToggle({
        account,
        hatId: BigInt(hatId),
        newToggle,
      });
    };
  }, [hatsClient, account, hatId, newToggle]);

  async function writeAsync() {
    return await writeAsyncOverride(hatsClient, account, hatId, newToggle);
  }

  return { writeAsync, writeAsyncOverride };
}

export function useCheckHatStatus(
  hatsClient: HatsClient | undefined,
  account: `0x${string}` | undefined,
  hatId: string
) {
  const writeAsyncOverride = useMemo(() => {
    return async (
      hatsClient: HatsClient | undefined,
      account: `0x${string}` | undefined,
      hatId: string
    ) => {
      if (!hatsClient) return;
      if (!account) return;

      return await hatsClient.checkHatStatus({ account, hatId: BigInt(hatId) });
    };
  }, [hatsClient, account, hatId]);

  async function writeAsync() {
    return await writeAsyncOverride(hatsClient, account, hatId);
  }

  return { writeAsync, writeAsyncOverride };
}

export function useCheckHatWearerStatus(
  hatsClient: HatsClient | undefined,
  account: `0x${string}` | undefined,
  hatId: string,
  wearer: `0x${string}`
) {
  const writeAsyncOverride = useMemo(() => {
    return async (
      hatsClient: HatsClient | undefined,
      account: `0x${string}` | undefined,
      hatId: string,
      wearer: `0x${string}`
    ) => {
      if (!hatsClient) return;
      if (!account) return;

      return await hatsClient.checkHatWearerStatus({
        account,
        hatId: BigInt(hatId),
        wearer,
      });
    };
  }, [hatsClient, account, hatId, wearer]);

  async function writeAsync() {
    return await writeAsyncOverride(hatsClient, account, hatId, wearer);
  }

  return { writeAsync, writeAsyncOverride };
}

export function useClaimHat(
  hatsClient: HatsClient | undefined,
  account: `0x${string}` | undefined,
  hatId: string
) {
  const writeAsyncOverride = useMemo(() => {
    return async (
      hatsClient: HatsClient | undefined,
      account: `0x${string}` | undefined,
      hatId: string
    ) => {
      if (!hatsClient) return;
      if (!account) return;

      return await hatsClient.claimHat({ account, hatId: BigInt(hatId) });
    };
  }, [hatsClient, account, hatId]);

  async function writeAsync() {
    return await writeAsyncOverride(hatsClient, account, hatId);
  }

  return { writeAsync, writeAsyncOverride };
}

export function useClaimHatFor(
  hatsClient: HatsClient | undefined,
  account: `0x${string}` | undefined,
  hatId: string,
  wearer: `0x${string}`
) {
  const writeAsyncOverride = useMemo(() => {
    return async (
      hatsClient: HatsClient | undefined,
      account: `0x${string}` | undefined,
      hatId: string,
      wearer: `0x${string}`
    ) => {
      if (!hatsClient) return;
      if (!account) return;

      return await hatsClient.claimHatFor({
        account,
        hatId: BigInt(hatId),
        wearer,
      });
    };
  }, [hatsClient, account, hatId, wearer]);

  async function writeAsync() {
    return await writeAsyncOverride(hatsClient, account, hatId, wearer);
  }

  return { writeAsync, writeAsyncOverride };
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
  const writeAsyncOverride = useMemo(() => {
    return async (
      hatsClient: HatsClient | undefined,
      account: `0x${string}` | undefined,
      admin: bigint,
      details: string,
      maxSupply: number,
      eligibility: `0x${string}`,
      toggle: `0x${string}`,
      mutable: boolean,
      imageURI?: string | undefined
    ) => {
      if (!hatsClient) return;
      if (!account) return;

      return await hatsClient.createHat({
        account,
        admin,
        details,
        maxSupply,
        eligibility,
        toggle,
        mutable,
        imageURI,
      });
    };
  }, [
    hatsClient,
    account,
    admin,
    details,
    maxSupply,
    eligibility,
    toggle,
    mutable,
    imageURI,
  ]);

  async function writeAsync() {
    return await writeAsyncOverride(
      hatsClient,
      account,
      admin,
      details,
      maxSupply,
      eligibility,
      toggle,
      mutable,
      imageURI
    );
  }

  return { writeAsync, writeAsyncOverride };
}

export function useMakeHatImmutable(
  hatsClient: HatsClient | undefined,
  account: `0x${string}` | undefined,
  hatId: string
) {
  const writeAsyncOverride = useMemo(() => {
    return async (
      hatsClient: HatsClient | undefined,
      account: `0x${string}` | undefined,
      hatId: string
    ) => {
      if (!hatsClient) return;
      if (!account) return;

      return await hatsClient.makeHatImmutable({
        account,
        hatId: BigInt(hatId),
      });
    };
  }, [hatsClient, account, hatId]);

  async function writeAsync() {
    return await writeAsyncOverride(hatsClient, account, hatId);
  }

  return { writeAsync, writeAsyncOverride };
}

export function useMintHat(
  hatsClient: HatsClient | undefined,
  account: `0x${string}` | Account,
  hatId: bigint,
  wearer: `0x${string}`
) {
  const writeAsyncOverride = useMemo(() => {
    return async (
      hatsClient: HatsClient | undefined,
      account: `0x${string}` | Account,
      hatId: bigint,
      wearer: `0x${string}`
    ) => {
      if (!hatsClient) return;
      if (!account) return;

      return await hatsClient.mintHat({
        account,
        hatId: BigInt(hatId),
        wearer,
      });
    };
  }, [hatsClient, account, hatId, wearer]);

  async function writeAsync() {
    return await writeAsyncOverride(hatsClient, account, hatId, wearer);
  }

  return { writeAsync, writeAsyncOverride };
}

export function useMintTopHat(
  hatsClient: HatsClient | undefined,
  account: `0x${string}` | Account,
  target: `0x${string}`,
  details: string,
  imageURI?: string | undefined
) {
  const writeAsyncOverride = useMemo(() => {
    return async (
      hatsClient: HatsClient | undefined,
      account: `0x${string}` | Account,
      target: `0x${string}`,
      details: string,
      imageURI?: string | undefined
    ) => {
      if (!hatsClient) return;
      if (!account) return;

      return await hatsClient.mintTopHat({
        account,
        target,
        details,
        imageURI,
      });
    };
  }, [hatsClient, account, target, details, imageURI]);

  async function writeAsync() {
    return await writeAsyncOverride(
      hatsClient,
      account,
      target,
      details,
      imageURI
    );
  }

  return { writeAsync, writeAsyncOverride };
}

export function useMultiClaimHatFor(
  hatsClient: HatsClient | undefined,
  account: `0x${string}` | Account,
  hatId: bigint,
  wearers: `0x${string}`[]
) {
  const writeAsyncOverride = useMemo(() => {
    return async (
      hatsClient: HatsClient | undefined,
      account: `0x${string}` | Account,
      hatId: bigint,
      wearers: `0x${string}`[]
    ) => {
      if (!hatsClient) return;
      if (!account) return;

      return await hatsClient.multiClaimHatFor({
        account,
        hatId: BigInt(hatId),
        wearers,
      });
    };
  }, [hatsClient, account, hatId, wearers]);

  async function writeAsync() {
    return await writeAsyncOverride(hatsClient, account, hatId, wearers);
  }

  return { writeAsync, writeAsyncOverride };
}

export function useMulticall(
  hatsClient: HatsClient | undefined,
  account: `0x${string}` | Account,
  calls: {
    functionName: string;
    callData: `0x${string}`;
  }[]
) {
  const writeAsyncOverride = useMemo(() => {
    return async (
      hatsClient: HatsClient | undefined,
      account: `0x${string}` | Account,
      calls: {
        functionName: string;
        callData: `0x${string}`;
      }[]
    ) => {
      if (!hatsClient) return;
      if (!account) return;

      return await hatsClient.multicall({ account, calls });
    };
  }, [hatsClient, account, calls]);

  async function writeAsync() {
    return await writeAsyncOverride(hatsClient, account, calls);
  }

  return { writeAsync, writeAsyncOverride };
}

export function useMulticallPreFlightCheck(
  hatsClient: HatsClient | undefined,
  account: `0x${string}` | Account,
  calls: {
    functionName: string;
    callData: `0x${string}`;
  }[]
) {
  const writeAsyncOverride = useMemo(() => {
    return async (
      hatsClient: HatsClient | undefined,
      account: `0x${string}` | Account,
      calls: {
        functionName: string;
        callData: `0x${string}`;
      }[]
    ) => {
      if (!hatsClient) return;
      if (!account) return;

      return await hatsClient.multicallPreFlightCheck({ account, calls });
    };
  }, [hatsClient, account, calls]);

  async function writeAsync() {
    return await writeAsyncOverride(hatsClient, account, calls);
  }

  return { writeAsync, writeAsyncOverride };
}

export function useRelinkTopHatWithinTree(
  hatsClient: HatsClient | undefined,
  account: `0x${string}` | Account,
  topHatDomain: number,
  newAdminHat: bigint,
  newEligibility?: `0x${string}` | undefined,
  newToggle?: `0x${string}` | undefined,
  newDetails?: string | undefined,
  newImageURI?: string | undefined
) {
  const writeAsyncOverride = useMemo(() => {
    return async (
      hatsClient: HatsClient | undefined,
      account: `0x${string}` | Account,
      topHatDomain: number,
      newAdminHat: bigint,
      newEligibility?: `0x${string}` | undefined,
      newToggle?: `0x${string}` | undefined,
      newDetails?: string | undefined,
      newImageURI?: string | undefined
    ) => {
      if (!hatsClient) return;
      if (!account) return;

      return await hatsClient.relinkTopHatWithinTree({
        account,
        topHatDomain,
        newAdminHat,
        newEligibility,
        newToggle,
        newDetails,
        newImageURI,
      });
    };
  }, [
    hatsClient,
    account,
    topHatDomain,
    newAdminHat,
    newEligibility,
    newToggle,
    newDetails,
    newImageURI,
  ]);

  async function writeAsync() {
    return await writeAsyncOverride(
      hatsClient,
      account,
      topHatDomain,
      newAdminHat,
      newEligibility,
      newToggle,
      newDetails,
      newImageURI
    );
  }

  return { writeAsync, writeAsyncOverride };
}

export function useRenounceHat(
  hatsClient: HatsClient | undefined,
  account: `0x${string}` | Account,
  hatId: bigint
) {
  const writeAsyncOverride = useMemo(() => {
    return async (
      hatsClient: HatsClient | undefined,
      account: `0x${string}` | Account,
      hatId: bigint
    ) => {
      if (!hatsClient) return;
      if (!account) return;

      return await hatsClient.renounceHat({ account, hatId });
    };
  }, [hatsClient, account, hatId]);

  async function writeAsync() {
    return await writeAsyncOverride(hatsClient, account, hatId);
  }

  return { writeAsync, writeAsyncOverride };
}

export function useRequestLinkTopHatToTree(
  hatsClient: HatsClient | undefined,
  account: `0x${string}` | Account,
  topHatDomain: number,
  requestedAdminHat: bigint
) {
  const writeAsyncOverride = useMemo(() => {
    return async (
      hatsClient: HatsClient | undefined,
      account: `0x${string}` | Account,
      topHatDomain: number,
      requestedAdminHat: bigint
    ) => {
      if (!hatsClient) return;
      if (!account) return;

      return await hatsClient.requestLinkTopHatToTree({
        account,
        topHatDomain,
        requestedAdminHat,
      });
    };
  }, [hatsClient, account, topHatDomain, requestedAdminHat]);

  async function writeAsync() {
    return await writeAsyncOverride(
      hatsClient,
      account,
      topHatDomain,
      requestedAdminHat
    );
  }

  return { writeAsync, writeAsyncOverride };
}

export function useSetHatStatus(
  hatsClient: HatsClient | undefined,
  account: `0x${string}` | Account,
  hatId: bigint,
  newStatus: boolean
) {
  const writeAsyncOverride = useMemo(() => {
    return async (
      hatsClient: HatsClient | undefined,
      account: `0x${string}` | Account,
      hatId: bigint,
      newStatus: boolean
    ) => {
      if (!hatsClient) return;
      if (!account) return;

      return await hatsClient.setHatStatus({ account, hatId, newStatus });
    };
  }, [hatsClient, account, hatId, newStatus]);

  async function writeAsync() {
    return await writeAsyncOverride(hatsClient, account, hatId, newStatus);
  }

  return { writeAsync, writeAsyncOverride };
}

export function useSetHatWearerStatus(
  hatsClient: HatsClient | undefined,
  account: `0x${string}` | Account,
  hatId: bigint,
  wearer: `0x${string}`,
  eligible: boolean,
  standing: boolean
) {
  const writeAsyncOverride = useMemo(() => {
    return async (
      hatsClient: HatsClient | undefined,
      account: `0x${string}` | Account,
      hatId: bigint,
      wearer: `0x${string}`,
      eligible: boolean,
      standing: boolean
    ) => {
      if (!hatsClient) return;
      if (!account) return;

      return await hatsClient.setHatWearerStatus({
        account,
        hatId,
        wearer,
        eligible,
        standing,
      });
    };
  }, [hatsClient, account, hatId, wearer, eligible, standing]);

  async function writeAsync() {
    return await writeAsyncOverride(
      hatsClient,
      account,
      hatId,
      wearer,
      eligible,
      standing
    );
  }

  return { writeAsync, writeAsyncOverride };
}

export function useTransferHat(
  hatsClient: HatsClient | undefined,
  account: `0x${string}` | Account,
  hatId: bigint,
  from: `0x${string}`,
  to: `0x${string}`
) {
  const writeAsyncOverride = useMemo(() => {
    return async (
      hatsClient: HatsClient | undefined,
      account: `0x${string}` | Account,
      hatId: bigint,
      from: `0x${string}`,
      to: `0x${string}`
    ) => {
      if (!hatsClient) return;
      if (!account) return;

      return await hatsClient.transferHat({
        account,
        hatId,
        from,
        to,
      });
    };
  }, [hatsClient, account, hatId, from, to]);

  async function writeAsync() {
    return await writeAsyncOverride(hatsClient, account, hatId, from, to);
  }

  return { writeAsync, writeAsyncOverride };
}

export function useUnlinkTopHatFromTree(
  hatsClient: HatsClient | undefined,
  account: `0x${string}` | Account,
  topHatDomain: number,
  wearer: `0x${string}`
) {
  const writeAsyncOverride = useMemo(() => {
    return async (
      hatsClient: HatsClient | undefined,
      account: `0x${string}` | Account,
      topHatDomain: number,
      wearer: `0x${string}`
    ) => {
      if (!hatsClient) return;
      if (!account) return;

      return await hatsClient.unlinkTopHatFromTree({
        account,
        topHatDomain,
        wearer,
      });
    };
  }, [hatsClient, account, topHatDomain, wearer]);

  async function writeAsync() {
    return await writeAsyncOverride(hatsClient, account, topHatDomain, wearer);
  }

  return { writeAsync, writeAsyncOverride };
}

async function yes() {
  const { data: walletClient } = useWalletClient();
  const publicClient = usePublicClient();
  const { hatsClient, getHatsClient } = useHatsClient(
    5,
    publicClient!,
    walletClient!
  );
  const account = useAccount();

  const { writeAsync, writeAsyncOverride } = useMakeHatImmutable(
    hatsClient,
    account.address,
    "0"
  );

  // const [data, setData] = useState<MakeHatImmutableResult>();

  async function callMe() {
    const res = await writeAsync();
    const res2 = await writeAsyncOverride(hatsClient, account.address, "0");

    // setData(res2);
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
