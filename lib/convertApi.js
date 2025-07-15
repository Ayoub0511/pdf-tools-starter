import ConvertAPI from 'convertapi';
const convertapi = new ConvertAPI(process.env.CONVERT_API_SECRET);
export default convertapi;