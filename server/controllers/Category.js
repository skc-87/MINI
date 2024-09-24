
const Category = require("../models/Category");

// create category handler function
exports.createCategory = async (req, res) => {

    try {
        console.log("In the try of create category")

        // fetch data
        const { name } = req.body;

        //validation
        if (!name ) {
            return res.status(400).json({
                success: true,
                message: "All  fields are required",
            })
        }
        // create entry in db
        console.log("Creating category...")
        const categoryDetails = await Category.create({
            name: name,
            // description: description,
        });

        console.log(categoryDetails);

        return res.status(200).json({
            success: true,
            message: "Category created successfully"
        });

    } catch (e) {

        return res.status(500).json({
            success: false,
            message: e.message,
        });

    }

}


// Get all category handler
exports.showAllCategory = async (req, res) => {

    try {
        // console.log("Show alll category")
        const allCategory = await Category.find({}, { name: true, description: true }); //It will give all the tags and should maintain that name and description is present
        // console.log("All category -> ", allCategory)
        return res.status(200).json({
            success: true,
            message: "All csategories are returned successfully",
            data: allCategory
        });

    } catch (e) {

        return res.status(500).json({
            success: false,
            message: e.message,
        });

    }

}

