import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { imageData, tone } = await request.json();

    console.log('API 키 확인:', process.env.OPENAI_API_KEY ? '있음' : '없음');
    console.log('톤:', tone);
    console.log('이미지 데이터 길이:', imageData?.length);

    if (!imageData) {
      return NextResponse.json(
        { error: '이미지가 필요합니다.' },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      console.error('OpenAI API 키가 설정되지 않았습니다.');
      return NextResponse.json(
        { error: 'API 키가 설정되지 않았습니다.' },
        { status: 500 }
      );
    }

    // 톤에 따른 프롬프트
    const tonePrompts: Record<string, string> = {
      assertive: '단호하고 명확하며 자신감 있는',
      respectful: '정중하고 배려있는',
      empathy: '따뜻하고 공감하는',
      friendly: '친근하고 편안한',
      professional: '전문적이고 격식있는',
    };

    const selectedTonePrompt = tonePrompts[tone] || tonePrompts.respectful;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: `당신은 대화 분석 전문가입니다. 스크린샷의 전체 대화를 분석하고, 맥락과 분위기를 파악하여 더 나은 커뮤니케이션 방법을 제안합니다.

**분석 방법:**
1. 전체 대화 맥락 파악: 누가 먼저 말했는지, 대화의 흐름, 관계성
2. 대화 분위기 분석: 긍정적/부정적, 편안함/긴장감, 친밀도
3. 상대방의 의도와 감정 읽기
4. 사용자의 마지막 메시지 또는 답변할 메시지 추출
5. 대화 맥락에 맞는 ${selectedTonePrompt} 톤으로 개선된 답변 제안

**주의사항:**
- 단순히 메시지 하나만 보지 말고, 전체 대화의 흐름을 고려하세요
- 상대방과의 관계(친구/동료/상사 등)를 파악하세요
- 대화의 목적(일정 조율, 부탁, 거절 등)을 이해하세요

응답은 반드시 다음 JSON 형식으로만 답변하세요:
{
  "conversationContext": "전체 대화의 상황과 맥락 요약 (2-3줄)",
  "conversationMood": "대화 분위기 (예: 편안하고 친근한 분위기, 조심스러운 분위기 등)",
  "relationship": "관계 추정 (예: 친한 친구, 직장 동료, 선후배 등)",
  "originalMessage": "사용자가 보낸/보낼 메시지 추출",
  "suggestions": [
    {
      "text": "개선된 메시지",
      "explanation": "왜 이 표현이 더 나은지 (1-2줄로 간단하게)",
      "risk": "low|medium|high"
    }
  ],
  "speechProblems": [
    {
      "problem": "화법 문제점 (한줄로 명확하게)",
      "solution": "개선 방법 (구체적이고 실행 가능하게)"
    }
  ]
}`,
        },
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: `이 대화 스크린샷의 전체 맥락을 파악하고 분석해주세요.

1. 전체 대화의 흐름과 분위기를 파악하세요
2. 상대방과의 관계를 추정하세요
3. 대화의 목적이 무엇인지 파악하세요
4. 사용자의 메시지가 대화 맥락에 적절한지 분석하세요
5. ${selectedTonePrompt} 톤으로 더 나은 답변을 제안해주세요`,
            },
            {
              type: 'image_url',
              image_url: {
                url: imageData,
              },
            },
          ],
        },
      ],
      max_tokens: 1500,
      temperature: 0.7,
    });

    const responseText = completion.choices[0]?.message?.content || '{}';

    console.log('OpenAI 응답:', responseText);

    // JSON 파싱 시도
    let analysisResult;
    try {
      // 코드 블록 제거 (```json ... ```)
      const cleanedText = responseText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      console.log('정리된 텍스트:', cleanedText);
      analysisResult = JSON.parse(cleanedText);
    } catch (parseError) {
      console.error('JSON 파싱 실패:', parseError);
      console.error('원본 응답:', responseText);
      // 파싱 실패 시 기본 응답
      analysisResult = {
        originalMessage: "메시지를 추출할 수 없습니다.",
        warnings: [],
        suggestions: [
          {
            text: "AI 분석 결과를 가져오는 중 문제가 발생했습니다.",
            explanation: `파싱 오류: ${parseError}`,
            risk: "low"
          }
        ]
      };
    }

    console.log('최종 결과:', analysisResult);
    return NextResponse.json(analysisResult);

  } catch (error: any) {
    console.error('분석 오류 상세:', error);
    console.error('에러 스택:', error.stack);
    return NextResponse.json(
      {
        error: error.message || '분석 중 오류가 발생했습니다.',
        details: error.toString(),
        originalMessage: "오류가 발생했습니다.",
        warnings: [],
        suggestions: [{
          text: "오류 발생",
          explanation: error.message,
          risk: "high"
        }]
      },
      { status: 500 }
    );
  }
}
