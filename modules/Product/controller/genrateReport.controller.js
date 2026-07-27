//External modules

//Internal modules
import { generateReportService } from "../Service/generateReport.service.js"
const generateReportController = async (req, res) => {
    try {
        const result = await generateReportService();
        res.status(200).json({
            success: true,
            message: 'Successfully get the Report of the data',
            data: result
        })
    } catch (error) {
        res.status(error.status || 500)
        .json({
            success: false,
            message: error.message
        })
    }
}

//export
export {generateReportController}