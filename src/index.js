import '@babel/polyfill';
import './second';
import './styles/index.scss';

const func = async () => Promise.resolve(10)
func().then(console.log)