import React from "react";
import Comment from "./Comment";
import CommentForm from "./CommentForm";

function Comments() {
	return (
		<div className="flex flex-col gap-4">
			<h1 className="text-md font-semibold">5 Comments</h1>
			<CommentForm />
			<div className="flex flex-col gap-4 mt-4">
				<Comment content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque bibendum sit amet ligula at mattis. Suspendisse orci ante, sollicitudin quis molestie ut, dictum quis leo. Morbi finibus viverra arcu non rutrum. Nam quis ullamcorper odio, eget ullamcorper nunc. Nam sed augue lobortis est mattis pellentesque. Aliquam ut sollicitudin metus. Morbi eleifend lorem non ipsum mollis, sed sollicitudin lorem bibendum. Vestibulum malesuada convallis risus eget sollicitudin." />
				<Comment content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque bibendum sit amet ligula at mattis. Suspendisse orci ante, sollicitudin quis molestie ut, dictum quis leo. Morbi finibus viverra arcu non rutrum. Nam quis ullamcorper odio, eget ullamcorper nunc. Nam sed augue lobortis est mattis pellentesque. Aliquam ut sollicitudin metus. Morbi eleifend lorem non ipsum mollis, sed sollicitudin lorem bibendum. Vestibulum malesuada convallis risus eget sollicitudin." />
				<Comment content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque bibendum sit amet ligula at mattis. Suspendisse orci ante, sollicitudin quis molestie ut, dictum quis leo. Morbi finibus viverra arcu non rutrum. Nam quis ullamcorper odio, eget ullamcorper nunc. Nam sed augue lobortis est mattis pellentesque. Aliquam ut sollicitudin metus. Morbi eleifend lorem non ipsum mollis, sed sollicitudin lorem bibendum. Vestibulum malesuada convallis risus eget sollicitudin." />
				<Comment content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque bibendum sit amet ligula at mattis. Suspendisse orci ante, sollicitudin quis molestie ut, dictum quis leo. Morbi finibus viverra arcu non rutrum. Nam quis ullamcorper odio, eget ullamcorper nunc. Nam sed augue lobortis est mattis pellentesque. Aliquam ut sollicitudin metus. Morbi eleifend lorem non ipsum mollis, sed sollicitudin lorem bibendum. Vestibulum malesuada convallis risus eget sollicitudin." />
				<Comment content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque bibendum sit amet ligula at mattis. Suspendisse orci ante, sollicitudin quis molestie ut, dictum quis leo. Morbi finibus viverra arcu non rutrum. Nam quis ullamcorper odio, eget ullamcorper nunc. Nam sed augue lobortis est mattis pellentesque. Aliquam ut sollicitudin metus. Morbi eleifend lorem non ipsum mollis, sed sollicitudin lorem bibendum. Vestibulum malesuada convallis risus eget sollicitudin." />
			</div>
		</div>
	);
}

export default Comments;
