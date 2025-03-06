import { createSlice } from "@reduxjs/toolkit";

// 초기 상태 정의
const initialState = {
    joinData: [],
    authed: false,
    user: "",
    isSignUpComplete: false,
    selectedMembership: "",
    goTg: null,
};

let no = initialState.joinData.length;

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        gotoTarget: (state, action) => {
            state.goTg = action.payload;
        },

        // 로그인 로직
        login: (state, action) => {
            const { id_email, password } = action.payload;

            // 공백 제거 및 대소문자 일관성 유지
            const cleanedEmail = id_email.toLowerCase().trim(); // 대소문자 구분 없이 비교

            // localStorage에서 해당 id_email로 저장된 사용자 정보 가져오기
            const storedUser = localStorage.getItem("user_" + cleanedEmail); // 'user_'를 기준으로 가져옵니다.

            if (storedUser) {
                const user = JSON.parse(storedUser);

                // 비밀번호가 맞는지 체크
                if (user.password === password) {
                    console.log("로그인 성공", user);
                    state.authed = true;
                    state.user = user;

                    // 로그인 성공 시, localStorage에 상태 저장
                    localStorage.setItem("authed", "true");
                    localStorage.setItem("user__로그인정보", JSON.stringify(user)); // 로그인 성공한 사용자 정보 저장
                } else {
                    console.log("비밀번호가 틀립니다");
                    state.authed = false;
                    localStorage.setItem("authed", "false");
                }
            } else {
                console.log("사용자를 찾을 수 없습니다");
                state.authed = false;
                localStorage.setItem("authed", "false");
            }
        },
        // 로그아웃 로직
        logout: (state) => {
            state.authed = false;
            state.user = null;
            localStorage.removeItem("authed");

            /* localStorage.removeItem('authed');
            localStorage.removeItem('user'); // 로컬스토리지에서 'user' 삭제
            localStorage.removeItem('token'); // 토큰도 삭제 (필요한 경우)
            localStorage.removeItem('id'); // 토큰도 삭제 (필요한 경우) */
        },

        // 회원가입 처리
        signup: (state, action) => {
            const user = action.payload;
            // joinData가 비어 있으면 id를 1로 시작, 아니면 기존 joinData의 길이를 기준으로 id 설정

            state.joinData.push({ id: no++, ...user });

            // 증가된 ID를 localStorage에 저장
            localStorage.setItem("userIdCounter", no); // 새로 증가된 ID 저장

            // 회원 정보 객체를 생성하여 localStorage에 저장
            const member = {
                id: no,
                id_email: user.id_email,
                password: user.password,
                username: user.username,
                tel: user.telFirst + user.telSecond + user.telThird,
            };
            localStorage.setItem("user_" + user.id_email, JSON.stringify(member)); // 'user_'를 키로 사용하여 저장
        },

        // 회원가입 완료 처리
        setSignUpComplete: (state, action) => {
            state.isSignUpComplete = action.payload;
        },

        loginSuccess: (state, action) => {
            const userData = action.payload; // userData를 받아옴
            state.authed = true; // 로그인 성공 시 authed 값을 true로 설정
            state.user = userData; // 로그인한 사용자 정보로 상태 업데이트
        },

        // 로그인 상태 복원 액션
        restoreAuthState: (state) => {
            const savedAuthed = localStorage.getItem("authed") === "true";
            if (savedAuthed) {
                const savedUser = JSON.parse(localStorage.getItem("user"));
                state.authed = true;
                state.user = savedUser;
            }
        },
        // setSelectedMembership: (state, action) => {
        //     state.selectedMembership = action.payload; // 선택된 멤버십을 상태로 설정
        //     const membershipInfo = {
        //         type: selectedMembership,
        //         price:
        //             selectedMembership === "AD_standard"
        //                 ? "5,500"
        //                 : selectedMembership === "standard"
        //                 ? "9,500"
        //                 : "13,900",
        //         quality: selectedMembership === "premium" ? "4K + HDR" : "1080p",
        //         devices: selectedMembership === "premium" ? "4" : "2",
        //         profiles: selectedMembership === "AD_standard" ? "2" : selectedMembership === "standard" ? "4" : "6",
        //         downloads: selectedMembership === "premium" ? "400" : "200",
        //         hasAds: selectedMemberships === "AD_standard",
        //         date: new Date().toISOString(),
        //     };
        //     localStorage.setItem("selectedMembership", JSON.stringify(membershipInfo));
        // },

        removeUsername: (state) => {
            state.user.username = "";
            // state.user.profileImage = "/images/default_profile.png";
        },
        // 사용자 이름 업데이트
        // authSlice.js 리듀서 예시
        updateUsername: (state, action) => {
            if (state.user) {
                state.user.username = action.payload; // user 객체의 username 값을 업데이트
            }
        },
        updatePassword: (state, action) => {
            const { currentPassword, newPassword } = action.payload;

            if (state.user && state.user.password === currentPassword) {
                // 현재 비밀번호가 맞다면 새로운 비밀번호로 업데이트
                state.user.password = newPassword;
            } else {
                // 현재 비밀번호가 일치하지 않으면 오류를 처리할 수 있음
                console.error("현재 비밀번호가 일치하지 않습니다.");
            }
        },
    },
});

// 상태를 변경하는 액션을 export
export const authActions = authSlice.actions;

export default authSlice.reducer;
