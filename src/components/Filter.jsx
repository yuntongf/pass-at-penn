import React from "react";
import Slider from '@mui/material/Slider';
const Filter = ({ showFilter, quality, difficulty, instructorQuality, setQuality, setDifficulty, setInstructorQuality }) => {
   return (
      <div>
         {showFilter &&
            <div className='d-flex justify-content-center'>
               <div className='col-12 d-flex justify-content-around'>
                  <div className=''>
                     <div className='me-2'>Quality</div>
                     <div className="col-12 mt-0">
                        <Slider className="" style={{ width: 100 }} max={4.0} value={quality} step={0.1} onChange={(e) => setQuality(e.target.value)} size="small" aria-label="Default" valueLabelDisplay="auto" />
                     </div>
                  </div>
                  <div className=''>
                     <div className='me-2'>Difficulty</div>
                     <div className="col-12 mt-0">
                        <Slider className="" style={{ width: 100 }} max={4.0} value={difficulty} step={0.1} onChange={(e) => setDifficulty(e.target.value)} size="small" aria-label="Default" valueLabelDisplay="auto" />
                     </div>
                  </div>
                  <div className=''>
                     <div className='me-2'>Instructor Quality</div>
                     <div className="col-12 mt-0">
                        <Slider className="" style={{ width: 100 }} max={4.0} value={instructorQuality} step={0.1} onChange={(e) => setInstructorQuality(e.target.value)} size="small" aria-label="Default" valueLabelDisplay="auto" />
                     </div>
                  </div>
               </div>
            </div>}
      </div>

   );
}

export default Filter;