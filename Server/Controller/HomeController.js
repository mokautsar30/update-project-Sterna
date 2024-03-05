


class HomeController {
    static async showHome(req,res) {
        try {
            res.status(200).json({message: "this is homepage"})
        } catch (error) {
            console.log(error);
        }
    }

}


module.exports = HomeController