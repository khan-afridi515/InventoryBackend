//Internal modules
import { generateReportRepository } from "../Repository/generateReport.repository.js";

const generateReportService = async () => {
    try {
        return await generateReportRepository();
    } catch (error) {
        throw error;
    }
}

//export
export {
    generateReportService
}