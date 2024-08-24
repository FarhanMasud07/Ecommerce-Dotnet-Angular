export class ShopParams {
  brandId = 0;
  typeId = 0;
  sort = 'name';
  pageNumber = 1;
  pageSize = 6;
  search = '';

  getValues(value: any): any {
    switch (value) {
      case 'brandId':
        if (this.brandId) return this.brandId;
        return null;
      case 'typeId':
        if (this.typeId) return this.typeId;
        return null;
      case 'sort':
        if (this.sort) return this.sort;
        return null;
      case 'pageNumber':
        if (this.pageNumber) return this.pageNumber;
        return null;
      case 'pageSize':
        if (this.pageSize) return this.pageSize;
        return null;
      case 'search':
        if (this.search) return this.search;
        return null;
      default:
        break;
    }
  }
}
