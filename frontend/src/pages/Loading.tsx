import SqaureLoader from "react-spinners/SquareLoader";

export default function Loading() {
    return (
        <div className="h-screen w-screen flex justify-center items-center">
            <SqaureLoader 
                color={`hsl(var(--p))`}
                loading={true}
                size={150}
            />
        </div>
    )
}