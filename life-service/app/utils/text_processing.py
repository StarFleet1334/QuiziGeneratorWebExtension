def split_into_chunks(text, max_length=350):
    sentences = text.split('.')
    chunks, current_chunk, current_length = [], [], 0

    for sentence in sentences:
        sentence = sentence.strip() + '.'
        sentence_length = len(sentence.split())
        if current_length + sentence_length > max_length:
            chunks.append(' '.join(current_chunk))
            current_chunk, current_length = [sentence], sentence_length
        else:
            current_chunk.append(sentence)
            current_length += sentence_length

    if current_chunk:
        chunks.append(' '.join(current_chunk))

    return chunks