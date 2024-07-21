import React, { useState } from 'react';
import CommentTime from './CommentTime';
import AddComment from './AddComment';


const CommentCard = ({ commentData, refreshData }) => {

    const [showReplies, setShowReplies] = useState(false);
    const [commentReply, setCommentReply] = useState(false);

    const handleShowReplies = () => {
        setShowReplies(!showReplies);
    }
    const handleCommentReply = () => {
        setCommentReply(!commentReply);
    }




    return (
        <>
            <div className='px-2 lg:px-5 space-y-1 py-3 bg-white dark:bg-color-2 rounded-md shadow-md'>
                <div className='text-color-3 dark:text-color-6 font-outfit-medium flex items-center gap-5 px-3 lg:px-5'>
                    <span><span>@</span>{commentData.user.username}</span>
                    <span className='text-color-4 dark:text-color-5 font-outfit text-sm'><CommentTime timestamp={commentData.created_at} /></span>
                </div>
                <div className='text-color-3 dark:text-color-6 px-3 lg:px-5'>
                    {commentData.comment}
                </div>
                <div>
                    <div onClick={handleCommentReply} className={` text-color-3 cursor-pointer w-fit px-3 py-1 lg:px-5 lg:py-1 rounded-full ${commentReply?'bg-color-5 dark:text-color-3':'dark:text-color-6'} hover:bg-color-5 dark:hover:bg-color-5 dark:hover:text-color-3 font-outfit-semibold`}>Reply</div>
                    {
                        commentReply && 
                        <div className='px-10 my-5'>
                            <AddComment profileId={commentData.profile_id} fetchProfileData={refreshData} commentReplyId={commentData.id} reply={true} />
                        </div>
                    }
                </div>

                {
                    commentData.replies.length > 0 &&
                    <div className=''>
                        <div onClick={handleShowReplies} className='flex select-none gap-1 text-blue-500 items-center cursor-pointer hover:bg-blue-100  w-fit px-3 py-1 lg:px-5 lg:py-2 rounded-full'>
                            <span className=''>
                                <svg className={`stroke-blue-500 fill-none ${showReplies?'rotate-180':''}`} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                            </span>
                            <span>{commentData.replies.length}</span>
                            replies
                        </div>

                        {
                            showReplies ? (
                                <div className='pl-7 lg:pl-10 space-y-5'>

                                    {
                                        commentData.replies.length > 0 &&
                                        commentData.replies.map((comment, index) => {
                                            return <div>
                                                <div className='text-color-3 dark:text-color-6 font-outfit-medium flex items-center gap-5 px-3 lg:px-5'>
                                                    <span><span>@</span>{comment.user.username}</span>
                                                    <span className='text-color-4 dark:text-color-5 font-outfit text-sm'><CommentTime timestamp={comment.created_at} /></span>
                                                </div>
                                                <div className='text-color-3 dark:text-color-6 px-3 lg:px-5'>
                                                    {comment.comment}
                                                </div>
                                            </div>;
                                        })
                                    }


                                </div>
                            )
                                :
                                (
                                    <></>
                                )
                        }

                    </div>
                }

            </div>

        </>
    );
};

export default CommentCard