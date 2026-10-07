// Product-scene building blocks. Brand-aware (useBrand), deterministic, sized in px at 1080p.
export * from './MacWindow';
export * from './BrowserFrame';
export * from './PhoneFrame';
export * from './Desktop';
export * from './Keycaps';
export * from './AIChat';
export * from './Chart';
export * from './Counter';
export * from './FeatureCards';
export * from './Stat';
export * from './Testimonial';
export * from './LogoReveal';
// Implemented in the preset families; re-exported here so product scenes import from one place.
export {NotificationStack, BannerStack, NotifCard} from '../presets/notifications';
export {ListAssemble, PromptBar, ThinkingState, Spinner} from '../presets/list';
export {ScreenSlot, LaptopFrame, LaptopReveal} from '../presets/screen';
