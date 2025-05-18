export default function ApplicationLogo(props) {
    return (
        <svg
            {...props}
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
        >
            {/* Circle background */}
            <circle cx="100" cy="100" r="90" fill="currentColor" opacity="0.1" />
            
            {/* Lightning bolt - representing emergency/quick response */}
            <path d="M100 20 L100 80 L130 80 L90 180 L90 100 L60 100 Z" 
                  strokeWidth="4" 
                  strokeLinejoin="round" 
                  strokeLinecap="round" 
                  fill="currentColor" />
            
            {/* Circular path - representing the "way" or path */}
            <path d="M100 10 A90 90 0 1 0 100 190 A90 90 0 1 0 100 10" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="6" 
                  strokeDasharray="15,10" />
            
            {/* Pulse effect circles */}
            <circle cx="100" cy="100" r="50" fill="none" stroke="currentColor" strokeWidth="3" opacity="0.7" />
            <circle cx="100" cy="100" r="70" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.4" />
        </svg>
    );
}
