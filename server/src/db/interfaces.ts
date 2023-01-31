
export type Status = 'pending' | 'completed' | 'rejected' | 'accepted'

export interface RequestParams {}

export interface ResponseBody {}

export interface RequestBody {}

export interface RequestQuery {}

export interface StatusQuery {
  status?: Status;
}

export interface IdQuery {
  id: string;
}

export interface CommissionBody {
  email: string;
  commission_detail: string;
  images: [string]
}

export interface AddImageBody {
  title: string;
  description: string
}

type orderBy = "date_posted" | "titles"

export interface PaginationBody {
  orderBy: orderBy;
  perPage: number;
  page: number;
}