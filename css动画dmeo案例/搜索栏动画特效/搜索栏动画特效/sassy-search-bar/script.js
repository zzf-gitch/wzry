"use strict";
var Icon;
(function (Icon) {
    Icon["EmojiAstonished"] = "fa-light fa-face-astonished";
    Icon["EmojiAwesome"] = "fa-light fa-face-awesome";
    Icon["EmojiConfounded"] = "fa-light fa-face-confounded";
    Icon["EmojiCowboyHat"] = "fa-light fa-face-cowboy-hat";
    Icon["EmojiDisguise"] = "fa-light fa-face-disguise";
    Icon["EmojiDizzy"] = "fa-light fa-face-dizzy";
    Icon["EmojiElated"] = "fa-light fa-face-laugh-beam";
    Icon["EmojiGiggle"] = "fa-light fa-face-beam-hand-over-mouth";
    Icon["EmojiLaugh"] = "fa-light fa-face-laugh-squint";
    Icon["EmojiTired"] = "fa-light fa-face-tired";
    Icon["EmojiWink"] = "fa-light fa-face-grin-wink";
    Icon["Loading"] = "fa-regular fa-spinner-third";
    Icon["Search"] = "fa-regular fa-magnifying-glass";
})(Icon || (Icon = {}));
(function (Icon) {
    Icon["Loading"] = "fa-regular fa-spinner-third";
    Icon["Search"] = "fa-regular fa-magnifying-glass";
})(Icon || (Icon = {}));
var Interaction;
(function (Interaction) {
    Interaction["CorrectQuery"] = "Correct Query";
    Interaction["Duplicate"] = "Duplicate";
    Interaction["Initiated"] = "Initiated";
    Interaction["Leaving"] = "Leaving";
    Interaction["Returning"] = "Returning";
    Interaction["Typing"] = "Typing";
    Interaction["Unknown"] = "Unknown";
})(Interaction || (Interaction = {}));
var RequestStatus;
(function (RequestStatus) {
    RequestStatus["Error"] = "Error";
    RequestStatus["Idle"] = "Idle";
    RequestStatus["Loading"] = "Loading";
    RequestStatus["Success"] = "Success";
})(RequestStatus || (RequestStatus = {}));
const NumberUtility = {
    random: (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
};
const InteractionUtility = {
    determineSass: (state) => {
        let statement = InteractionUtility.getRandomStatement([
            "Welcome! Please click on the search bar.",
            "Good day to you. Please click above to begin.",
            "Hello. Please click on me to continue."
        ]);
        let emoji = Icon.Search;
        if (state.status === RequestStatus.Loading) {
            statement = InteractionUtility.getRandomStatement([
                "Searching across the universe.",
                "Scanning every image ever.",
                "Finding your precious results.",
                "Boop beep bop boop."
            ]);
            emoji = Icon.Loading;
        }
        else if (state.interaction === Interaction.Typing) {
            if (state.query.trim() === "") {
                statement = InteractionUtility.getRandomStatement([
                    `You can't search "nothing", you silly goose.`,
                    `That, my friends, is what we call an "empty string".`,
                    "Am bored. Pls send more letters."
                ]);
                emoji = Icon.EmojiDizzy;
            }
            else {
                statement = InteractionUtility.getRandomStatement([
                    "Great work lol.",
                    "Those are some good letters.",
                    "Hit enter to search.",
                    "Are you sure?",
                    "Is that all?"
                ]);
                emoji = InteractionUtility.getRandomEmoji([Icon.EmojiDisguise, Icon.EmojiGiggle, Icon.EmojiLaugh, Icon.EmojiWink]);
            }
        }
        else if (state.interaction === Interaction.Leaving) {
            statement = InteractionUtility.getRandomStatement([
                "Not good enough for ya, eh?",
                "Sayonara!",
                "Not even so much as a goodbye?",
                "Fine, cya later.",
                "See if I care!"
            ]);
            emoji = Icon.EmojiConfounded;
        }
        else if (state.interaction === Interaction.Returning) {
            statement = InteractionUtility.getRandomStatement([
                "Hooray, you're back!",
                "Please don't leave me again.",
                "It's searchin' time!"
            ]);
            emoji = InteractionUtility.getRandomEmoji([Icon.EmojiElated, Icon.EmojiCowboyHat]);
        }
        else if (state.interaction === Interaction.CorrectQuery) {
            statement = InteractionUtility.getRandomStatement([
                "Oh wow. We actually have results for that. Here you go.",
                "Well, well, well. Somebody must've been here before. Enjoy.",
                "Get that on your first try, did you? Doubt it."
            ]);
            emoji = Icon.EmojiAstonished;
        }
        else if (state.interaction === Interaction.Duplicate) {
            statement = InteractionUtility.getRandomStatement([
                "Yeah, you just searched that. Try something else.",
                "Be original please. I just searched that.",
                "C'mon now. Don't make me search that again."
            ]);
            emoji = InteractionUtility.getRandomEmoji([Icon.EmojiConfounded, Icon.EmojiTired]);
        }
        else if (state.interaction === Interaction.Initiated) {
            if (state.searching) {
                statement = InteractionUtility.getRandomStatement([
                    `Great search. Here's some ${state.collectionID} as a reward.`,
                    `Hmm, haven't heard of that. Have some ${state.collectionID} instead.`,
                    `Search poorly worded. Returning some ${state.collectionID} instead.`
                ]);
            }
            else {
                statement = InteractionUtility.getRandomStatement([
                    "Good job! Now start typing.",
                    "Wow, you did it. Step 1 complete."
                ]);
            }
            emoji = InteractionUtility.getRandomEmoji([Icon.EmojiAwesome, Icon.EmojiElated]);
        }
        return {
            emoji,
            statement
        };
    },
    getRandomEmoji: (emojis) => {
        const rand = NumberUtility.random(0, emojis.length - 1);
        return emojis[rand];
    },
    getRandomStatement: (statements) => {
        const rand = NumberUtility.random(0, statements.length - 1);
        return statements[rand];
    }
};
const defaultSass = () => ({
    emoji: null,
    statement: ""
});
const SearchBarSass = () => {
    const { state } = React.useContext(AppContext);
    const [sass, setSassTo] = React.useState(defaultSass());
    React.useEffect(() => {
        setSassTo(InteractionUtility.determineSass(state));
    }, [state]);
    const getIconWrapperClasses = () => {
        const emoji = (state.interaction !== Interaction.Unknown &&
            state.status !== RequestStatus.Loading);
        const typing = state.interaction === Interaction.Typing;
        return classNames({ emoji, typing });
    };
    const getIconClasses = () => {
        return classNames(sass.emoji, {
            "spin-animation": state.status === RequestStatus.Loading
        });
    };
    return (React.createElement("div", { id: "search-bar-sass" },
        React.createElement("div", { id: "search-bar-sass-icon", className: getIconWrapperClasses() },
            React.createElement("i", { key: NumberUtility.random(1, 10000), className: getIconClasses() })),
        React.createElement("h1", { key: NumberUtility.random(1, 10000), id: "search-bar-sass-statement" }, sass.statement)));
};
const SearchResult = (props) => {
    const [visible, setVisibleTo] = React.useState(false), [loaded, setLoadedTo] = React.useState(false), [size, setSizeTo] = React.useState(0);
    const { result } = props;
    React.useEffect(() => {
        setSizeTo(NumberUtility.random(5, 10));
    }, []);
    React.useEffect(() => {
        if (visible) {
            const preview = new Image();
            preview.src = result.urls.small;
            preview.onload = () => {
                setLoadedTo(true);
            };
        }
    }, [visible]);
    React.useEffect(() => {
        const ms = (props.index * 50) + NumberUtility.random(0, 50);
        const timeout = setTimeout(() => {
            setVisibleTo(true);
        }, ms);
        return () => {
            clearTimeout(timeout);
        };
    }, []);
    const classes = classNames("search-result", { loaded, visible });
    const photoUrl = `https://unsplash.com/photos/${result.id}?utm_source=CodePen&utm_medium=referral`, creatorUrl = `${result.creator.link}?utm_source=CodePen&utm_medium=referral`;
    const backgroundImage = `url(${result.urls.small}), url(${result.urls.thumbnail})`, gridRowEnd = `span ${size}`;
    return (React.createElement("div", { className: classes, style: { gridRowEnd } },
        React.createElement("a", { className: "search-result-background", href: photoUrl, style: { backgroundColor: result.color, backgroundImage }, target: "_blank" }),
        React.createElement("div", { className: "search-result-info-wrapper" },
            React.createElement("div", { className: "search-result-info" },
                React.createElement("a", { className: "search-result-creator", href: creatorUrl, target: "_blank" }, result.creator.name)))));
};
const SearchResults = (props) => {
    const getResults = () => {
        return props.results.map((result, index) => (React.createElement(SearchResult, { key: result.id, index: index, result: result })));
    };
    return (React.createElement("div", { id: "search-results-wrapper" },
        React.createElement("div", { id: "search-results" }, getResults())));
};
const SearchBar = () => {
    const { state, setInteractionTo, setStateTo } = React.useContext(AppContext);
    const ref = React.useRef(null);
    const focused = state.interaction !== Interaction.Unknown && state.interaction !== Interaction.Leaving, querying = state.query !== "";
    const simulateSearch = (collectionID) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(UnsplashPhotoRepository.random(30, collectionID));
            }, 800);
        });
    };
    const handleOnSearch = async () => {
        if (state.query.trim() === "") {
            return;
        }
        else if (state.query.trim() === state.previousQuery.trim()) {
            setInteractionTo(Interaction.Duplicate);
        }
        else if (state.status !== RequestStatus.Loading) {
            setStateTo(Object.assign(Object.assign({}, state), { results: [], status: RequestStatus.Loading }));
            const collectionID = UnsplashPhotoRepository.randomCollection(state.query), matches = state.query.trim().toLowerCase() === collectionID, interaction = matches ? Interaction.CorrectQuery : Interaction.Initiated;
            const results = await simulateSearch(collectionID);
            setStateTo(Object.assign(Object.assign({}, state), { collectionID,
                interaction, previousQuery: state.query.trim(), results, searching: true, status: RequestStatus.Success }));
        }
    };
    const handleOnBlur = () => {
        setInteractionTo(Interaction.Leaving);
    };
    const handleOnChange = (query) => {
        setStateTo(Object.assign(Object.assign({}, state), { interaction: Interaction.Typing, query }));
    };
    const handleOnFocus = () => {
        if (state.interaction === Interaction.Leaving) {
            setInteractionTo(Interaction.Returning);
        }
        else {
            setInteractionTo(Interaction.Initiated);
        }
    };
    const handleOnKeyDown = (e) => {
        if (e.key === "Enter") {
            handleOnSearch();
        }
    };
    const getClicker = () => {
        if (!focused && !state.searching) {
            const handleOnClick = () => {
                ref.current.focus();
            };
            return (React.createElement("div", { id: "search-bar-clicker", onClick: handleOnClick }));
        }
    };
    const getResetButton = () => {
        if (state.searching) {
            const handleOnReset = () => {
                setStateTo(defaultAppState());
            };
            return (React.createElement("button", { id: "search-bar-reset-button", type: "button", onClick: handleOnReset },
                React.createElement("i", { className: "fa-regular fa-arrow-rotate-right" })));
        }
    };
    return (React.createElement("div", { id: "search-bar-aligner", className: classNames({ focused, querying, searching: state.searching }) },
        React.createElement("div", { id: "search-bar-wrapper" },
            React.createElement("div", { id: "search-bar" },
                getClicker(),
                React.createElement("i", { id: "search-bar-logo", className: Icon.Search }),
                React.createElement("input", { autoComplete: "off", onBlur: handleOnBlur, onFocus: handleOnFocus, id: "search-bar-input", placeholder: "Search", ref: ref, type: "text", value: state.query, onChange: (e) => handleOnChange(e.target.value), onKeyDown: handleOnKeyDown }),
                getResetButton()),
            React.createElement(SearchBarSass, null))));
};
const defaultAppState = () => ({
    background: UnsplashPhotoRepository.random(1, "animals"),
    collectionID: null,
    interaction: Interaction.Unknown,
    previousQuery: "",
    query: "",
    results: [],
    searching: false,
    status: RequestStatus.Idle
});
const AppContext = React.createContext(null);
const App = () => {
    const [state, setStateTo] = React.useState(defaultAppState());
    /* -- Example search -- */
    React.useEffect(() => {
        const query = "Hit the reset button ➡️", collectionID = UnsplashPhotoRepository.randomCollection();
        setStateTo(Object.assign(Object.assign({}, state), { query, status: RequestStatus.Loading }));
        setTimeout(() => {
            setStateTo(Object.assign(Object.assign({}, state), { collectionID, interaction: Interaction.Initiated, query, previousQuery: query, results: UnsplashPhotoRepository.random(30, collectionID), searching: true, status: RequestStatus.Success }));
        }, 500);
    }, []);
    /* -- ---------- -- */
    const setInteractionTo = (interaction) => {
        setStateTo(Object.assign(Object.assign({}, state), { interaction }));
    };
    const getBackgroundStyles = () => ({
        backgroundColor: state.background.color,
        backgroundImage: `url(${state.background.urls.regular}), url(${state.background.urls.small})`
    });
    const value = {
        state,
        setInteractionTo,
        setStateTo
    };
    const memoizedSearchResults = React.useMemo(() => React.createElement(SearchResults, { results: state.results }), [state.results]);
    return (React.createElement(AppContext.Provider, { value: value },
        React.createElement("div", { id: "app" },
            React.createElement("div", { id: "app-background", className: classNames({ searching: state.searching }) },
                React.createElement("div", { id: "app-background-image", style: getBackgroundStyles() }),
                React.createElement("div", { id: "app-background-image-filter" })),
            React.createElement(SearchBar, null),
            memoizedSearchResults)));
};
ReactDOM.render(React.createElement(App, null), document.getElementById("root"));