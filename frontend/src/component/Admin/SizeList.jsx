import React from 'react'

const SizesList = ({list,deleteSize}) => {
    return list.length > 0 && <><h3 style={{textAlign:"center",fontSize:"15px"}}>Size đã chọn</h3><div>
        
        {list.map(size => (
            <div key={size.name} className="ChooseSize" onClick={() => deleteSize(size.name)}>{size.name}</div>
        ))}
    </div></>
}
export default SizesList