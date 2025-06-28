import { Collapse } from "@mui/material";
import { useEffect, useState, useRef, useLayoutEffect } from "react";

interface CommentInputProps {
    comment: string,
    collapseCallback: () => void
  }

function CommentInput(props: CommentInputProps) {
    const placeHolder = "Комментарий";
    const [activeStyle, setActiveStyle] = useState<string>("commentInput telegram-bg telegram-text h-full");
    const [text, setText] = useState<string>(props.comment);
    const [showClear, setShowClear] = useState<boolean>(false);

    const commentRef = useRef<any>(null);

    function adjustHeight() {
        commentRef.current.style.height = "inherit";
        commentRef.current.style.height = `${commentRef.current.scrollHeight}px`;
      }
    
      useLayoutEffect(adjustHeight, []);


    const onChange = (event:any) => {
        const input = event.target.value;
        if (input.length <= 1000) {
            setText(input)
        } else {
            setText(input.substring(0,1000))
        }
    }

    useEffect(() => {adjustHeight();}, [text]);

    const onFocus = () => {
        let newStyle = activeStyle;
        if (activeStyle.includes("empty")) {
            setText("");
            newStyle = activeStyle.replace("empty", "");
        }
        setActiveStyle(newStyle + " focused");

        props.collapseCallback();
    }

    const onBlur = () => {
        if (text.length == 0) {
            setText(placeHolder);
            setActiveStyle(activeStyle.replace("focused", "empty"));
        } else {
            setActiveStyle(activeStyle.replace("focused", ""));
        }

        props.collapseCallback()
    }

    useEffect(() => {
        if (props.comment == undefined || props.comment.length == 0) {
            setText(placeHolder);
            if (!activeStyle.includes("empty")) {
                setActiveStyle(activeStyle + " empty");
            }
        } else {
            setText(props.comment);
            setActiveStyle(activeStyle.replace("empty", ""));
        }
    }, [props.comment])

    useEffect(() => {
        if (text.length > 0 && !activeStyle.includes("empty")) {
            setShowClear(true);
        } else {
            setShowClear(false);
        }
    }, [text, activeStyle])

    const clear = (event:any) => {
        event.preventDefault();
        setText(placeHolder);
        setActiveStyle(activeStyle + " empty");
    }

    return (
        <div className="mb-4">
            <div className="flex justify-center">
                <textarea ref={commentRef} className={activeStyle} rows={3} onFocus={onFocus} onBlur={onBlur}
                value={text} onChange={onChange} name="comment" />
            </div>
            <div className="flex justify-end">
                <Collapse in={showClear}>
                    <button className="clear" onClick={clear}>Стереть</button>
                </Collapse>
            </div>
        </div>
    )
}

export default CommentInput;