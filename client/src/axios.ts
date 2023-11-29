import Axios from 'axios';
import hostname from './hostname';

export default Axios.create({
	baseURL: `${hostname}/api`,
});
