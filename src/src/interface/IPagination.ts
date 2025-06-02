export interface IPagination{
    searchTerm: string;
     pageIndex: number; 
     pageSize: number;
     length: number;
     nameSortAsc?: boolean;
     statusSortAsc?: boolean;
     terminatingDateSortAsc?: boolean;
     planRenewalDateSortAsc?: boolean;
     consultantSortAsc?: boolean;
}