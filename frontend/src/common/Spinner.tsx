export default function SpinnerButton({ label = 'Loading...' }: { label?: string }) {
    return (
        <div className="w-full flex items-center justify-center">
            <button type="button" disabled className="inline-flex items-center px-4 py-2 rounded-md bg-blue-600 text-white font-medium disabled:opacity-80">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                </svg>
                <span>{label}</span>
            </button>
        </div>
    );
}
