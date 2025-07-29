import Header from "../components/organism/Header";
import GallerySection from "../components/organism/GallerySection"
import ResourceLibraryCard from "../components/organism/ResourceLibraryCard"
import TutorialSection from "../components/organism/TutorialSection"

import Footer from "../components/organism/Footer"

function ResourceLibrary() {

  return (
    <>
      <Header />
      <ResourceLibraryCard/>
      <TutorialSection/>
      <GallerySection/>

      <Footer/>
    </>
  )
}

export default ResourceLibrary
