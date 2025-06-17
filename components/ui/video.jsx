
export function MarketVid() {
    return (
        <video className="w-full rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 lg:absolute lg:left-0 lg:h-full lg:w-auto lg:max-w-none" width={320} height={240} controls preload='none'>
            <source src='/videos/market_vid.mp4' type='video/mp4' />
        </video>
    );
}
