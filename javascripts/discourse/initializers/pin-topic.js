import { apiInitializer } from 'discourse/lib/api';
import PinTopic from '../components/pin-topic';

export default apiInitializer('1.14.0', (api) => {
    api.renderInOutlet(settings.plugin_outlet.trim(), PinTopic);
});