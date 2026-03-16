export default function MapComponent() {
    const keralaEmbedUrl = "https://maps.google.com/maps?q=10.8505,76.2711&z=7&output=embed";

    return (
        <div className="w-full h-full relative">
            <iframe
                title="Google Map"
                src={keralaEmbedUrl}
                className="w-full h-full border-0 filter transition duration-500 dark:[filter:grayscale(100%)_invert(92%)]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
            />
        </div>
    );
}