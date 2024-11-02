export default function TaskCard({task}){

    return(
        <>
        <div className="bg-[#222020] p-4 rounded-lg shadow-lg mb-4 shadow-black">
            <h3 className="text-white">{task}</h3>

        </div>
        </>
    )
}