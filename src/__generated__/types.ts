export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  DateTime: { input: any; output: any };
};

export type AddContactsToCampaignInput = {
  campaignId: Scalars["String"]["input"];
  contactIds: Array<Scalars["String"]["input"]>;
};

export type Campaign = {
  __typename?: "Campaign";
  channelType: CampaignChannel;
  contacts: Array<Contact>;
  createdAt: Scalars["DateTime"]["output"];
  description: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  status: CampaignStatus;
  title: Scalars["String"]["output"];
  updatedAt: Scalars["DateTime"]["output"];
};

export enum CampaignChannel {
  Discord = "DISCORD",
  Email = "EMAIL",
  Slack = "SLACK",
  Sms = "SMS",
  Whatsapp = "WHATSAPP",
}

export type CampaignFiltersInput = {
  createdAfter?: InputMaybe<Scalars["String"]["input"]>;
  createdBefore?: InputMaybe<Scalars["String"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sortBy?: InputMaybe<CampaignSortBy>;
  sortOrder?: InputMaybe<SortOrder>;
  status?: InputMaybe<CampaignStatus>;
};

export enum CampaignSortBy {
  CreatedAt = "CREATED_AT",
  Name = "NAME",
  Status = "STATUS",
  UpdatedAt = "UPDATED_AT",
}

export enum CampaignStatus {
  Active = "ACTIVE",
  Completed = "COMPLETED",
  Draft = "DRAFT",
  Failed = "FAILED",
  Queued = "QUEUED",
}

export type CampaignsResponse = {
  __typename?: "CampaignsResponse";
  campaigns: Array<Campaign>;
  pagination: PaginationInfo;
};

export type Contact = {
  __typename?: "Contact";
  contactChannels: Array<ContactChannel>;
  createdAt: Scalars["DateTime"]["output"];
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
  updatedAt: Scalars["DateTime"]["output"];
};

export type ContactChannel = {
  __typename?: "ContactChannel";
  createdAt: Scalars["DateTime"]["output"];
  id: Scalars["ID"]["output"];
  type: ContactType;
  updatedAt: Scalars["DateTime"]["output"];
  value: Scalars["String"]["output"];
};

export enum ContactType {
  Email = "EMAIL",
  Phone = "PHONE",
}

export type CreateCampaignInput = {
  channelType: CampaignChannel;
  contactIds?: InputMaybe<Array<Scalars["String"]["input"]>>;
  description: Scalars["String"]["input"];
  status?: InputMaybe<CampaignStatus>;
  title: Scalars["String"]["input"];
};

export type CreateContactChannelInput = {
  type: ContactType;
  value: Scalars["String"]["input"];
};

export type CreateContactInput = {
  contactChannels: Array<CreateContactChannelInput>;
  name: Scalars["String"]["input"];
};

export type LoginResponse = {
  __typename?: "LoginResponse";
  message: Scalars["String"]["output"];
  user: PublicUser;
};

export type LoginUserInput = {
  email: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
};

export type Mutation = {
  __typename?: "Mutation";
  addContactsToCampaign: Campaign;
  createCampaign: Campaign;
  createContact: Contact;
  login: LoginResponse;
  register: RegisterResponse;
};

export type MutationAddContactsToCampaignArgs = {
  input: AddContactsToCampaignInput;
};

export type MutationCreateCampaignArgs = {
  input: CreateCampaignInput;
};

export type MutationCreateContactArgs = {
  input: CreateContactInput;
};

export type MutationLoginArgs = {
  input: LoginUserInput;
};

export type MutationRegisterArgs = {
  input: RegisterUserInput;
};

export type PaginationInfo = {
  __typename?: "PaginationInfo";
  hasNextPage: Scalars["Boolean"]["output"];
  hasPreviousPage: Scalars["Boolean"]["output"];
  limit: Scalars["Int"]["output"];
  page: Scalars["Int"]["output"];
  total: Scalars["Int"]["output"];
  totalPages: Scalars["Int"]["output"];
};

export type PublicUser = {
  __typename?: "PublicUser";
  createdAt: Scalars["DateTime"]["output"];
  email: Scalars["String"]["output"];
  id: Scalars["String"]["output"];
  lastLoginAt?: Maybe<Scalars["DateTime"]["output"]>;
  name: Scalars["String"]["output"];
  updatedAt: Scalars["DateTime"]["output"];
};

export type Query = {
  __typename?: "Query";
  campaign: Campaign;
  campaigns: CampaignsResponse;
  currentUser?: Maybe<User>;
};

export type QueryCampaignArgs = {
  id: Scalars["String"]["input"];
};

export type QueryCampaignsArgs = {
  filters?: InputMaybe<CampaignFiltersInput>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
};

export type RegisterResponse = {
  __typename?: "RegisterResponse";
  data: PublicUser;
  message: Scalars["String"]["output"];
};

export type RegisterUserInput = {
  confirmPassword: Scalars["String"]["input"];
  email: Scalars["String"]["input"];
  name: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
};

export enum SortOrder {
  Asc = "ASC",
  Desc = "DESC",
}

export type User = {
  __typename?: "User";
  createdAt: Scalars["DateTime"]["output"];
  email: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  lastLoginAt?: Maybe<Scalars["DateTime"]["output"]>;
  name: Scalars["String"]["output"];
  updatedAt: Scalars["DateTime"]["output"];
};

export type LoginMutationVariables = Exact<{
  input: LoginUserInput;
}>;

export type LoginMutation = {
  __typename?: "Mutation";
  login: {
    __typename?: "LoginResponse";
    message: string;
    user: {
      __typename?: "PublicUser";
      id: string;
      email: string;
      name: string;
    };
  };
};

export type RegisterMutationVariables = Exact<{
  input: RegisterUserInput;
}>;

export type RegisterMutation = {
  __typename?: "Mutation";
  register: {
    __typename?: "RegisterResponse";
    message: string;
    data: {
      __typename?: "PublicUser";
      id: string;
      email: string;
      name: string;
    };
  };
};
