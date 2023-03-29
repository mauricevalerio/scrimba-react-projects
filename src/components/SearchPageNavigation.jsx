import FirstPageIcon from "../assets/page-navigation-icons/first-page.svg"
import PreviousPageIcon from "../assets/page-navigation-icons/previous-page.svg"
import NextPageIcon from "../assets/page-navigation-icons/next-page.svg"
import LastPageIcon from "../assets/page-navigation-icons/last-page.svg"

export default function SearchPageNavigation(props) {
    function handleFirstPage() { props.currentPage === 1 ? null : props.setCurrentPage(1) }

    function handlePreviousPage() { props.currentPage === 1 ? null : props.setCurrentPage(prevPage => prevPage - 1) }
    
    function handleNextPage() { props.currentPage === props.pageCount ? null : props.setCurrentPage(prevPage => prevPage + 1) }
    
    function handleLastPage() { props.currentPage === props.pageCount ? null : props.setCurrentPage(props.pageCount) }

    return (
        <>
            {props.results.length >= 1 ?
                <div className="font-bold text-lg justify-center items-center my-4 flex gap-4">
                    <img src={FirstPageIcon} alt="First Page Icon" className="w-[20px] cursor-pointer" onClick={handleFirstPage}/>
                    <img src={PreviousPageIcon} alt="Previous Page Icon" className="w-[30px] cursor-pointer" onClick={handlePreviousPage}/>
                    Page {props.currentPage} of {props.pageCount}
                    <img src={NextPageIcon} alt="Next Page Icon" className="w-[30px] cursor-pointer" onClick={handleNextPage}/>
                    <img src={LastPageIcon} alt="Last Page Icon" className="w-[20px] cursor-pointer" onClick={handleLastPage}/>
                </div>
            : null}
        </>
    )
}



