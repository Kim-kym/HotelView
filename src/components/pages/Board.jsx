// src/components/Board.jsx
import React, { useState, useEffect } from "react";
import userDummy from "./UserDummy";
import "../../styled/Board.css";

// 항상 보일 더미 게시글 (변경하지 않음)
const DUMMY_POSTS = [
  {
    id: 1,
    title: "첫번째 게시글",
    content: "첫번째 게시글 내용입니다.",
    author: "hong@example.com",
    createdAt: "2023-01-01",
    answers: [],
  },
  {
    id: 2,
    title: "두번째 게시글",
    content: "두번째 게시글 내용입니다.",
    author: "user2@example.com",
    createdAt: "2023-01-02",
    answers: [],
  },
];

// 사용자 작성 게시글을 저장할 고유 키
const LOCAL_STORAGE_KEY_USER_POSTS = "myApp_boardUserPosts";

const Board = () => {
  const [currentUser, setCurrentUser] = useState(null);
  // 초기 상태를 localStorage에서 불러오도록 lazy initializer 사용
  const [userPosts, setUserPosts] = useState(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY_USER_POSTS);
    return stored ? JSON.parse(stored) : [];
  });
  const [view, setView] = useState("list"); // "list", "detail", "form"
  const [selectedPost, setSelectedPost] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // 최종 게시글 목록: dummy 게시글과 사용자 작성 글을 병합한 후 작성일 내림차순 정렬
  const posts = [...DUMMY_POSTS, ...userPosts].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  // sessionStorage에서 로그인 정보를 읽어 currentUser 업데이트
  useEffect(() => {
    const loadUserFromSession = () => {
      const userRole = sessionStorage.getItem("userRole");
      const userName = sessionStorage.getItem("userName");
      const userId = sessionStorage.getItem("userId");
      const userEmail = sessionStorage.getItem("userEmail");
      if (userRole && userName && userId && userEmail) {
        const user = userDummy.find((u) => u.email === userEmail);
        setCurrentUser(user || { role: userRole, name: userName, id: userId, email: userEmail });
      } else {
        setCurrentUser(null);
      }
    };

    loadUserFromSession();
    const handleAuthChange = () => loadUserFromSession();
    window.addEventListener("authChange", handleAuthChange);
    return () => window.removeEventListener("authChange", handleAuthChange);
  }, []);

  // userPosts 상태 변경 시 localStorage 업데이트
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_USER_POSTS, JSON.stringify(userPosts));
  }, [userPosts]);

  // 게시글 목록에서 글 클릭 시 상세보기로 전환
  const handleSelectPost = (post) => {
    setSelectedPost(post);
    setView("detail");
  };

  // 게시글 삭제 (사용자 작성 글만 삭제)
  const handleDeletePost = (postId) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      setUserPosts(userPosts.filter((post) => post.id !== postId));
      setView("list");
    }
  };

  // 글 작성/수정 폼 제출 처리
  const handleSubmitPost = (postData) => {
    if (isEditing) {
      // 수정 시 기존 글의 createdAt과 answers를 보존하면서 title, content만 업데이트
      setUserPosts(
        userPosts.map((post) =>
          post.id === postData.id
            ? { ...post, title: postData.title, content: postData.content }
            : post
        )
      );
    } else {
      const newPost = {
        ...postData,
        id: Date.now(),
        createdAt: new Date().toISOString().slice(0, 10),
        answers: [],
      };
      setUserPosts([newPost, ...userPosts]);
    }
    setView("list");
  };

  // 관리자가 게시글에 답변 달기
  // 관리자가 게시글에 답변 달기
const handleAddAnswer = (postId, answerContent) => {
  let updated = false;
  const updatedUserPosts = userPosts.map((post) => {
    if (post.id === postId) {
      updated = true;
      return {
        ...post,
        answers: [
          ...post.answers,
          {
            id: Date.now(),
            content: answerContent,
            admin: currentUser ? currentUser.email : "unknown",
            createdAt: new Date().toISOString().slice(0, 10),
          },
        ],
      };
    }
    return post;
  });
  if (updated) {
    setUserPosts(updatedUserPosts);
    // 만약 현재 상세보기하는 게시글이 업데이트된 게시글이라면 selectedPost도 업데이트
    if (selectedPost && selectedPost.id === postId) {
      setSelectedPost(updatedUserPosts.find((p) => p.id === postId));
    }
  } else {
    // 만약 사용자가 작성한 글이 아니라 dummy 게시글에 답변을 달 경우
    const dummyPost = DUMMY_POSTS.find((p) => p.id === postId);
    if (dummyPost) {
      const newPost = {
        ...dummyPost,
        answers: [
          ...dummyPost.answers,
          {
            id: Date.now(),
            content: answerContent,
            admin: currentUser ? currentUser.email : "unknown",
            createdAt: new Date().toISOString().slice(0, 10),
          },
        ],
      };
      const newUserPosts = [newPost, ...userPosts];
      setUserPosts(newUserPosts);
      if (selectedPost && selectedPost.id === postId) {
        setSelectedPost(newPost);
      }
    }
  }
};

  return (
    <div className="board-page">
      <h1>게시판</h1>
      {view === "list" && (
        <div className="list-container">
          <ul className="post-list">
            {posts.map((post) => (
              <li key={post.id} onClick={() => handleSelectPost(post)}>
                <h2>{post.title}</h2>
                <p>작성자: {post.author}</p>
                <p>{post.createdAt}</p>
              </li>
            ))}
          </ul>
          {currentUser && (
            <div className="write-button-container">
              <button
                onClick={() => {
                  setIsEditing(false);
                  setSelectedPost(null);
                  setView("form");
                }}
              >
                글쓰기
              </button>
            </div>
          )}
        </div>
      )}
      {view === "detail" && selectedPost && (
        <PostDetail
          post={selectedPost}
          currentUser={currentUser}
          onBack={() => setView("list")}
          onEdit={(post) => {
            if (currentUser && (currentUser.role === "admin" || currentUser.name === post.author)) {
              setIsEditing(true);
              setSelectedPost(post);
              setView("form");
            } else {
              alert("수정 권한이 없습니다.");
            }
          }}
          onDelete={handleDeletePost}
          onAddAnswer={handleAddAnswer}
        />
      )}
      {view === "form" && (
        <PostForm
          post={isEditing ? selectedPost : null}
          onSubmit={handleSubmitPost}
          onCancel={() => setView("list")}
          currentUser={currentUser}
        />
      )}
    </div>
  );
};

const PostDetail = ({ post, currentUser, onBack, onEdit, onDelete, onAddAnswer }) => {
  const [answerText, setAnswerText] = useState("");
  return (
    <div className="post-detail">
      <button className="back-button" onClick={onBack}>
        목록으로
      </button>
      <h2>{post.title}</h2>
      <p>작성자: {post.author}</p>
      <p>작성일: {post.createdAt}</p>
      <div className="content">{post.content}</div>
      {currentUser &&
        ((currentUser.role === "admin") ||
          (currentUser.role !== "admin" && currentUser.name === post.author)) && (
          <div className="post-buttons">
            <button onClick={() => onEdit(post)}>수정</button>
            <button onClick={() => onDelete(post.id)}>삭제</button>
          </div>
        )}
      {/* 답변 목록은 항상 렌더링 (답변이 없으면 빈 배열로 처리) */}
      { (post.answers || []).length > 0 && (
        <div className="answer-list">
          <h3>답변</h3>
          <ul>
            {(post.answers || []).map((answer) => (
              <li key={answer.id}>
                <p>{answer.content}</p>
                <p>관리자: {answer.admin}</p>
                <p>{answer.createdAt}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
      {/* 답변 입력 영역은 관리자만 보이도록 */}
      {currentUser && currentUser.role === "admin" && (
        <div className="answer-input">
          <textarea
            placeholder="답변을 입력하세요"
            value={answerText}
            onChange={(e) => setAnswerText(e.target.value)}
          />
          <button
            onClick={() => {
              onAddAnswer(post.id, answerText);
              setAnswerText("");
            }}
          >
            답변 달기
          </button>
        </div>
      )}
    </div>
  );
};

const PostForm = ({ post, onSubmit, onCancel, currentUser }) => {
  const [title, setTitle] = useState(post ? post.title : "");
  const [content, setContent] = useState(post ? post.content : "");
  const handleSubmit = (e) => {
    e.preventDefault();
    const postData = {
      id: post ? post.id : undefined,
      title,
      content,
      author: post ? post.author : currentUser ? currentUser.name : "익명",
    };
    onSubmit(postData);
  };
  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <h2>{post ? "게시글 수정" : "새 게시글 작성"}</h2>
      <div>
        <label>제목</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div>
        <label>내용</label>
        <textarea value={content} onChange={(e) => setContent(e.target.value)} required />
      </div>
      <div className="form-buttons">
        <button type="submit">{post ? "수정하기" : "작성하기"}</button>
        <button type="button" onClick={onCancel}>
          취소
        </button>
      </div>
    </form>
  );
};

export default Board;