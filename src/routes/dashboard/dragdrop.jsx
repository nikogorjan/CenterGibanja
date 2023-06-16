import React, { useState, useEffect } from "react";
import { ReactSortable } from "react-sortablejs";
import styled from "styled-components";
import "./dragdrop.css";
import { Buffer } from "buffer";


const StyledBlockWrapper = styled.div`
  position: relative;
  background: white;
  padding: 20px;
  margin-bottom: 10px;
  border: 1px solid lightgray;
  border-radius: 4px;
  cursor: move;
  &:hover {
    //background: #eeeeee;
  }
`;

const sortableOptions = {
  animation: 150,
  fallbackOnBody: true,
  swapThreshold: 0.65,
  ghostClass: "ghost",
  group: "shared",
  forceFallback: true
};

export default function DragDrop() {
  
  const [blocks, setBlocks] = useState([]);


  useEffect(() => {
    fetchData2(setBlocks);
  }, []);



  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5174/getdata");
      const data = await response.json();
      console.log("response: ", response);
      console.log("data: ", data);

      const sortedData = data.sort((a, b) => a.zaporedje - b.zaporedje);

      const formattedData = sortedData.map((item) => {
        // Convert buffer to data URL
        const imageBuffer = Buffer.from(item.slika);
        const imageDataURL = `data:image/jpeg;base64,${imageBuffer.toString("base64")}`;

        return {
          id: item.iddata,
          content: (
            <div>
              <h2>{item.naslov}</h2>
              <p>{item.podnaslov}</p>
            </div>
          ),
          image: imageDataURL,
          otherData: item,
          width: 3,
          type: "text",
          parent_id: 1,
        };
      });

      setBlocks(formattedData);
    } catch (error) {
      console.error(error);
    }
  };


  const handleSort = async (newBlocks) => {
    // Update the "zaporedje" values in the newBlocks array
    const updatedBlocks = newBlocks.map((block, index) => ({
      ...block,
      zaporedje: index + 1, // Set the new "zaporedje" value based on the index
    }));
  
    // Extract the IDs from the updated blocks
    const ids = updatedBlocks.map((block) => block.id);
  
    // Update the "zaporedje" values in the database
    try {
      await fetch("http://localhost:5174/updatezaporedje", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedBlocks),
      });

  
      setBlocks(updatedBlocks); // Update the state with the new order
    } catch (error) {
      console.error(error);
    }
  };

  const getImageUrl = (imageData) => {
    return new Promise((resolve, reject) => {
      if (Buffer.isBuffer(imageData)) {
        const base64Image = imageData.toString("base64");
        const mimeType = "image/jpeg"; // Adjust the MIME type according to your image format
        const dataUrl = `data:${mimeType};base64,${base64Image}`;
        resolve(dataUrl);
      } else if (typeof imageData === "string") {
        resolve(imageData); // Already a URL
      } else {
        reject(new Error("Invalid image data"));
      }
    });
  };

  return (
    <div>
      <ReactSortable list={blocks} setList={handleSort} {...sortableOptions}>
        {blocks.map((block) => (
          <BlockWrapper key={block.id} block={block} setBlocks={setBlocks} />
        ))}
      </ReactSortable>
    </div>
  );
}
function Container({ block, blockIndex, setBlocks }) {
  return (
    <>
      <ReactSortable
        key={block.id}
        list={block.children}
        setList={(currentList) => {
          setBlocks((sourceList) => {
            const tempList = [...sourceList];
            const _blockIndex = [...blockIndex];
            const lastIndex = _blockIndex.pop();
            const lastArr = _blockIndex.reduce(
              (arr, i) => arr[i]["children"],
              tempList
            );
            console.log(lastIndex);
            lastArr[lastIndex]["children"] = currentList;
            return tempList;
          });
        }}
        {...sortableOptions}
      >
        {block.children &&
          block.children.map((childBlock, index) => {
            return (
              <BlockWrapper
                key={childBlock.id}
                block={childBlock}
                blockIndex={[...blockIndex, index]}
                setBlocks={setBlocks}
              />
            );
          })}
      </ReactSortable>
    </>
  );
}
function BlockWrapper({ block, blockIndex, setBlocks }) {
  if (!block) return null;
  if (block.type === "container") {
    return (
      <StyledBlockWrapper className="block">
        container: {block.content}
        <img src={block.image} alt="Image" />
        <Container block={block} setBlocks={setBlocks} blockIndex={blockIndex} />
      </StyledBlockWrapper>
    );
  } else {
    return (
      <StyledBlockWrapper className="block" id="set-block-radius">
        <div className="container-rules">
        <div className="image-container-drag-drop" style={{
          backgroundImage: `url(${block.image})`,
          backgroundSize: "cover", // Adjust the background size as needed
          backgroundPosition: "center", // Adjust the background position as needed
        }}>

        </div>
        <div className="content-container">{block.content}</div>
                <div className="content-container">{block.content}</div>

        </div>
      </StyledBlockWrapper>
    );
  }
}


export async function fetchData2(setBlocks) {
  try {
    const response = await fetch("http://localhost:5174/getdata");
    const data = await response.json();
    console.log("response: ", response);
    console.log("data: ", data);

    const sortedData = data.sort((a, b) => a.zaporedje - b.zaporedje);

    const formattedData = sortedData.map((item) => {
      // Convert buffer to data URL
      const imageBuffer = Buffer.from(item.slika);
      const imageDataURL = `data:image/jpeg;base64,${imageBuffer.toString("base64")}`;

      return {
        id: item.iddata,
        content: (
          <div>
            <h2>{item.naslov}</h2>
            <p>{item.podnaslov}</p>
          </div>
        ),
        image: imageDataURL,
        width: 3,
        type: "text",
        parent_id: 1,
      };
    });

    setBlocks(formattedData);
  } catch (error) {
    console.error(error);
  }
}