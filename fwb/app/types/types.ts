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
  blocked_users: string;
  company: string;
  created_at: string;
  email: string;
  id: string;
  profile_picture_url: string;
  reported_users: string[];
  user_discounts: string[];
  user_groups: string[];
  user_id: string;
  user_messages: string[];
  username: string;
  verified: boolean;
}
[];
