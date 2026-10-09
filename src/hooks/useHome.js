import { useState, useEffect } from "react";
import { fetchGetAllBuildCharacters } from "../service/homeService";
export const useHome = () => {
    const [build, setBuild] = useState([]);
    const [selectedClass, setSelectedClass] = useState('all');
    const [selectedType, setSelectedType] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const filteredBuilds = build.filter((build) => {
        const matchClass = selectedClass === 'all' || build.jobClass === selectedClass;
        const matchType = selectedType === 'all' || build.buildType === selectedType;
        return matchClass && matchType;
    });

    const totalPages = Math.max(1, Math.ceil(filteredBuilds.length / itemsPerPage));
    const safeCurrentPage = Math.min(currentPage, totalPages);
    const paginatedBuilds = filteredBuilds.slice(
        (safeCurrentPage - 1) * itemsPerPage,
        safeCurrentPage * itemsPerPage
    );
    useEffect(() => {
      setCurrentPage(1);
    }, [selectedClass, selectedType]);
    
    useEffect(() => {
      if (currentPage > totalPages) {
        setCurrentPage(totalPages);
      }
    }, [currentPage, totalPages]);
    
    useEffect(() => {
      fetchGetAllBuildCharacters().then((data) => {
        setBuild(data);
      });
    },[])

    return {itemsPerPage,filteredBuilds,selectedClass,setSelectedClass,selectedType,setSelectedType,totalPages,safeCurrentPage,paginatedBuilds}

    
}