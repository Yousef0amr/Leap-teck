class ApiFeatures {
    constructor(mongooseQuery, queryData, filterOptions) {
        this.mongooseQuery = mongooseQuery;
        this.queryData = queryData;

    }
    pagination = () => {
        let page = this.queryData.page
        let size = this.queryData.size
        if (page <= 0 || !page) page = 1
        if (size <= 0 || !size) size = 10
        const skip = size * (page - 1)
        this.mongooseQuery.skip(skip).limit(size)
        return this
    }

    filter = (filterOptions) => {
        const excluded = ['sort', 'page', 'size', 'fields', 'searchKey', 'ln', 'status'];
        console.log(filterOptions)
        let queryFields = { ...this.queryData, ...filterOptions }; // Merge with filter options
        console.log(queryFields);
        // Remove excluded fields
        excluded.forEach(ele => {
            delete queryFields[ele];
        });

        // Transform fields for comparison operators
        queryFields = JSON.stringify(queryFields).replace(/lte|lt|gte|gt/g, (match) => {
            return `$${match}`;
        });

        queryFields = JSON.parse(queryFields);

        // Apply dynamic filtering for each field
        Object.keys(queryFields).forEach(field => {
            switch (field) {
                case 'ratingsAvg':
                    this.mongooseQuery.find({ ratingsAvg: queryFields[field] });
                    break;
                case 'location':
                    if (queryFields[field].coordinates) {
                        this.mongooseQuery.find({
                            'businessInfo.location': {
                                $near: {
                                    $geometry: {
                                        type: 'Point',
                                        coordinates: queryFields[field].coordinates,
                                    },
                                    $maxDistance: queryFields[field].maxDistance || 10000,
                                },
                            },
                        });
                    }
                    break;
                case 'category':
                    this.mongooseQuery.find({ 'businessInfo.categories': queryFields[field] });
                    break;
                // Add more cases for additional fields as needed
            }
        });

        return this;
    };


    sort = () => {
        if (this.queryData.sort) {
            this.mongooseQuery.sort(this.queryData.sort.replace(/,/g, ' '))
        }
        return this
    }
    search = (filter = []) => {
        if (this.queryData.searchKey) {
            this.mongooseQuery.find({
                $or: filter
            })
        }
        return this
    }

    select = () => {
        this.mongooseQuery.select(this.queryData.fields?.replace(/,/g, ' '))
        return this
    }
}



module.exports = ApiFeatures



