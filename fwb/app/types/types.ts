export interface GroupData {
  id: string;
  name: string;
  users: string[];
  discounts: string[];
  admins: string[];
}
export interface DiscountData {
  created_at: string;
  user_id: string;
  terms_and_conditions: string;
  shareable_url: string;
  discount_amount: number;
  view_count: number;
  share_count: number;
  message_count: number;
  public: true;
  id: string;
  logo: string;
  name: string;
}

export interface UserData {
  success: boolean,
  users: User[]
}
[];

export interface User {
      id: string,
      created_at: string,
      user_id: string,
      username: string,
      email: string[],
      user_discounts: string[],
      user_groups: string[],
      user_messages: string[],
      company: string,
      verified: false,
      blocked_users: string[],
      reported_users: string[],
      profile_picture_url: string,
      hasCompletedFRE: boolean[],
}